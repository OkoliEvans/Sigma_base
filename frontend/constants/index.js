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
    name: "Register your election",
    description:
      "Click on the 'Get started' button to submit your event details to the platform.",
  },
  {
    id: 2,
    imageurl: "/filled-box-256.png",
    name: "Create your election",
    description:
      "Click on 'Create event' button, Enter the unique ID generated for you and hit Upload.",
  },
  {
    id: 3,
    imageurl: "/stack-of-photos-256.png",
    name: "Get your election NFTs",
    description:
      "Click on a particular event, after the event page loads, click on 'Register' button.",
  },
  {
    id: 4,
    imageurl: "/tag-5-256.png",
    name: "Claim attendance ticket",
    description:
      "On an already registered event, click on 'Claim' button. Note that only users that attended the event can claim.",
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
