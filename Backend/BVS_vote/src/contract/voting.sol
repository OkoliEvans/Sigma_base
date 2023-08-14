// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title An on-chain voting system that only allows verified ctizens to vote, mitigating fraud and double voting.
/// @author Okoli Evans, Ominisan Patrick, Olorunfemi Babalola Samuel
/// @notice For open and trusted voting system that allows only verified accounts to access vote function. Vote results are returned in real time.
/// @dev Restricts access to 'Controller', 'Agents' and actual voters. Returns vote counts autonomously to the frontend via interval calls

import "../../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Voting is ERC721, ERC721URIStorage {
    event NewCandidate(address addr, string position);
    event RmCandidate(address addr, string position);
    event Verified(address _voter, uint256 vn);
    event Voted(address voter, address candidate);

    struct Voter {
        uint256 _ID;
        bytes32 _hashVn;
        address _address;
        bool _isVerified;
        bool _voted;
    }

    struct Candidate {
        uint256 _ID;
        uint256 _age;
        uint256 _votes;
        address _address;
        string _fullName;
        string _post;
        string _desc;
        bool _isEligible;
    }

    struct Election {
        uint256 voteID;
        uint256 startT;
        uint256 endT;
        uint256 tokenId;
        string contest;
        string tokenURI;
        string baseUri;
        bool started;
    }
    // initialize structs
    // Voter public voter;
    // Candidate public candidate;
    Election public election;

    // state variables
    address public GModerator;
    address public overseer;

    mapping(address _candidate => Candidate) candidate;
    mapping(address _voter => Voter) public voters;
    Candidate[] public candidates;

    constructor(
        string memory name,
        string memory symbol,
        string memory tokenUri,
        string memory tElection,
        uint256 voteId,
        uint256 start,
        uint256 end,
        address _overseer,
        address moderator
    ) ERC721(name, symbol) {
        GModerator = moderator;
        overseer = _overseer;
        _init(voteId, start, end, tokenUri, tElection);
    }

    modifier onlyAdmin() {
        require(msg.sender == overseer);
        _;
    }

    ////////////////////////////////////////////////////////////////
    ///////////////// CORE FUNCTIONS  //////////////////////////////
    ////////////////////////////////////////////////////////////////

    /// @param post is the position ot title that is being contested
    /// @param desc is the brief description or introduction of the candidate
    function addCandidate(
        uint256 id,
        uint256 age,
        address addr,
        string calldata fullName,
        string calldata post,
        string calldata desc
    ) external onlyAdmin {
        if (addr == address(0)) revert("addCandidate: Address_0");
        if (candidate[addr]._address == addr)
            revert("addCandidate: Already added");
        if (id == 0 || id == candidate[addr]._ID)
            revert("addCAndidate: Invalid ID");
        if (age == 0) revert("addCandidate: Invalid age");
        bytes32 nullHash = keccak256(abi.encode(""));
        bytes32 nameHash = keccak256(abi.encode(fullName));
        bytes32 descHsh = keccak256(abi.encode(desc));
        if (nameHash == nullHash || descHsh == nullHash)
            revert("addCandidate: Invalid name or desc");

        candidate[addr]._ID = id;
        candidate[addr]._age = age;
        candidate[addr]._address = addr;
        candidate[addr]._fullName = fullName;
        candidate[addr]._post = post;
        candidate[addr]._desc = desc;
        candidate[addr]._isEligible = true;

        candidates.push(
            Candidate({
                _ID: id,
                _age: age,
                _votes: 0,
                _address: addr,
                _fullName: fullName,
                _post: post,
                _desc: desc,
                _isEligible: true
            })
        );

        emit NewCandidate(addr, post);
    }

    function rmCandidate(
        address addr
    ) external onlyAdmin returns (Candidate[] memory) {
        if (!candidate[addr]._isEligible)
            revert("rmCandidate: Candidate already disqualified");

        if (addr == candidate[addr]._address) {
            candidate[addr]._isEligible = false;

            /// delete from candidates array
            uint256 IndexCandidate = retIndexOfCandidate(addr);
            uint256 lastIndex = candidates.length - 1;
            // uint256 lastId = candidates[lastIndex];

            uint256 exId = candidates[IndexCandidate];
            candidates[exId] = lastIndex;
            candidates.pop();
        }

        return candidates;
        emit RmCandidate(addr, candidate[addr]._post);
    }

    function verify(uint256 vn) external {
        address voter_ = msg.sender;
        if (voters[voter_]._isVerified) revert("verify: Double reg.");
        bytes32 vnHash = keccak256(abi.encode(vn));
        bytes32 verifiedVnHash = voters[voter_]._hashVn;
        if (vnHash == verifiedVnHash) revert("verify: VN in database");

        string memory uri_ = election.tokenURI;
        uint256 tokenId = election.tokenId;
        tokenId = tokenId + 1;

        voters[voter_]._ID = vn;
        voters[voter_]._hashVn = vnHash;
        voters[voter_]._address = msg.sender;
        voters[voter_]._isVerified = true;
        _safeMint2(voter_, tokenId, uri_);
        emit Verified(msg.sender, vn);
    }

    ///@notice Returns details of a particular voter
    function retVoter(address addrVoter) external view returns (Voter memory) {
        return voters[addrVoter];
    }

    function startVote() external onlyAdmin {
        if (candidates.length <= 0)
            revert("startVote: No registered candidates");
        if (election.started) revert("start: Voting already in session");
        if (block.timestamp < election.startT) revert("start: not startTime");

        election.started = true;
    }

    function endVote() external onlyAdmin {
        if (!election.started) revert("end: Voting not in session");
        if (election.endT < election.startT) revert("end: not endTime");

        election.started = false;
    }

    function vote(uint64 voteId, address addrCandidate) external {
        address voter_ = msg.sender;
        if (!voters[voter_]._isVerified) revert("vote: Not verified");
        if (voters[voter_]._voted) revert("vote: Voted");
        if (!candidate[addrCandidate]._isEligible)
            revert("vote: Candidate disqualified");

        if (
            election.voteID == voteId &&
            addrCandidate == candidate[addrCandidate]._address
        ) {
            _vote(voteId, addrCandidate);
        }
    }

    function displayElection() external view returns (Election memory) {
        return election;
    }

    ////////////////////////////////////////////////////////////////
    //////////////////// HELPER FUNCTIONS /////////////////////////
    ///////////////////////////////////////////////////////////////
    function _init(
        uint256 voteId,
        uint256 start,
        uint256 end,
        string memory uri,
        string memory contest
    ) internal {
        election.voteID = voteId;
        election.startT = start;
        election.endT = end;
        election.tokenId = voteId;
        election.tokenURI = uri;
        election.contest = contest;
        election.baseUri = "https://ipfs.io/ipfs/";
    }

    function _vote(uint256 voteId, address addrCandidate) internal {
        voters[msg.sender]._voted = true;
        for (uint c = 0; c < candidates.length; c++) {
            if (addrCandidate == candidate[addrCandidate]._address) {
                candidate[addrCandidate]._votes =
                    candidate[addrCandidate]._votes +
                    1;
                candidates[addrCandidate]._votes += 1;
            }
        }

        emit Voted(msg.sender, addrCandidate);
    }

    function retIndexOfCandidate(address addr) internal returns (uint256) {
        if (addr == candidate[addr]._address) {
            for (uint i = 0; i < candidates.length; i++) {
                uint256 indexOfCandidate = candidates[addr].index;
                return indexOfCandidate;
            }
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI(uint256 voteId) internal view returns (string memory) {
        return election.baseUri;
    }

    function _safeMint2(
        address to,
        uint256 tokenId,
        string memory uri
    ) internal {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = election.tokenURI;
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate thevirtual baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "This token cannot be transferred."
        );
        super._beforeTokenTransfer(from, to, tokenId, 1);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);

        string memory _tokenURI = election.tokenURI;
        if (bytes(_tokenURI).length != 0) {
            delete _tokenURI;
        }
    }
}
