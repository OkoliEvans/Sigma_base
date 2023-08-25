export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const navLinks = [
  {
    id: "home",
    title: "Home",
    address: "/",
  },
  {
    id: "vote",
    title: "Vote",
    address: "/vote",
  },
  {
    id: "about",
    title: "About",
    address: "/about",
  },
  {
    id: "docs",
    title: "Docs",
    address: "/docs",
  },
];

export const business = [
  {
    id: 1,
    imageurl: "/wallet-2-256.png",
    name: "Create Election",
    description:
      "Click on the 'create election', pass in the required details in the form and sign the transaction on your wallet.",
  },
  {
    id: 2,
    imageurl: "/filled-box-256.png",
    name: "Add Candidates",
    description:
      "On the admin page for the election, click on 'add candidates' to add candidates that will be contesting for a position.",
  },
  {
    id: 3,
    imageurl: "/stack-of-photos-256.png",
    name: "Get  Verified",
    description:
      "Click on a particular election, after the page loads, click on the 'verify' button, then pass in the required details",
  },
  {
    id: 4,
    imageurl: "/tag-5-256.png",
    name: "Vote",
    description:
      "On an already hosted election on which you are verified, click on 'vote' button. Note that only users that are verified can vote.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Finally, MetaSquare has puts control back in the hands of the users. With decentralized ticketing, I no longer worry about scalpers or fraud. It's a game-changer!",
    name: "Kramer",
    title: "Tech CEO",
  },
  {
    id: "feedback-2",
    content:
      "This decentralized ticketing platform revolutionized my event experience. I could easily buy and sell tickets securely without any intermediaries. Highly recommended!",
    name: "John",
    title: "Senior Engineer",
  },
  {
    id: "feedback-3",
    content:
      "I love how MetaSquare ensures fairness by preventing ticket hoarding and price manipulation. It's a win-win for both event-goers and organizers.",
    name: "Adebayo",
    title: "Lead Manager",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Admin",
        link: "./createid",
      },
      {
        name: "Set Voters",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "How it Works",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Explore",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Terms & Services",
        link: "https://www.web3bridge.com/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Partners",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Suggestions",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Blog",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Newsletters",
        link: "https://www.web3bridge.com/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.web3bridge.com/",
      },
      {
        name: "Become a Partner",
        link: "https://www.web3bridge.com/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: "/instagram.svg",
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: "/facebook.svg",
    link: "https://facebook.com/profile.php?id=100092571884723",
  },
  {
    id: "social-media-3",
    icon: "/twitter.svg",
    link: "https://twitter.com/",
  },
  {
    id: "social-media-4",
    icon: "/linkedin.svg",
    link: "https://www.linkedin.com/",
  },
];
