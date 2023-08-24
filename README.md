# Sigma base
Decentralized voting engine for creating and hosting elections. Anyone can create and hold elections, in an open, transparent and trustless manner. 

**How the system works**
## Create election
An election overseer or administrator can create an election easily by simply passing in the following: 

i. An election id <br/>
ii. Token name for vote tag <br/>
iii. Token symbol <br/>
iv. Election title <br/>
v. Date and time for start of election **in unix time** <br/>

When the needed data are provided, a new voting instance is created for that election. The details of the election are recorded and accessible. But no voting can hold just yet until the contesting candidates are added and the start election button clicked. The technical parts have been perfectly abstracted out for easy use of the newest web3 user.

**Next step**
## Add Candidates
Only an election administrator or the overseer can add candidates. Candidates refer to the persons that will be contesting for positions in the election. These candidates will be displayed on that particular election instance where they are added.
Each candidate will be displayed on the election page with the following params:

i. age <br/>
ii. wallet address <br/>
iii. full name <br/>
iv. position <br/>
v. brief description of the person <br/>

Candidates already added can be **disqualified** from contesting by calling the 'rmCandidate' function which is available as a button in the admin page.

**Control election flow**

**start vote:** This function kicks off the voting process. It is only after the administrator starts the process that verified voters can cast their votes. To start the process the administrator will need to pass the time when the voting will end. This is to enable the system to track the duration and capture moments during the voting process.

**end vote:** This signals the end of the voting process. At the click of this button, no one can cast votes anymore, and the election is basically complete. Therefore this button is only available to the election administrator.


## For Voters

The Sigma voting engine by design is built to resolve the problem of multiple registration by an individual, and by extension, multiple voting. The design thinking was to eliminate voting fraud totally, while keeping the entire process open, transparent and credible. We also plan to add features that will enable diaspora voting too. Voter **registration** on Sigma begins with verification.

**verification** <br/>
Verification on the platform begins as an offchain process that ensures that the voter seeking to get verified is truly a bonafide citizen of the country, club or group hosting the election. We plan to make the system robust that every administrator that set verification parameters and conditions, but the single verification system we have have works with mobile sms. For now we make do with this, while we wait for approval from the NCC ministry for access to endpoints for validation using BVN, NIN, Passport and Drivers license.

**How to:** <br/>
Simply click on the particular election to open up the election page, then click on the "verify" button. As you pass in your mobile number, you'll get an sms containing your verification Id. Enter the Id, then click on "enter", on the wallet modal that pops up select the wallet you have, then sign the verification message. This will get you verified onchain and you are eligible to vote in that election. 





