import React from "react";

const linksArr = [
  {
    href: "https://news.ycombinator.com/newsguidelines.html",
    title: "Guidelines",
  },
  { href: "https://news.ycombinator.com/newsfaq.html", title: "FAQ" },
  {
    href: "https://news.ycombinator.com/lists",
    title: "Lists",
  },
  { href: "https://github.com/HackerNews/API", title: "API" },
  {
    href: "https://news.ycombinator.com/security.html",
    title: "Security",
  },
  { href: "https://www.ycombinator.com/legal/", title: "Legal" },
  {
    href: "https://www.ycombinator.com/apply/",
    title: "Apply to YC",
  },
  { href: "mailto: hn@ycombinator.com", title: "Contact" },
];

export const FooterLinksList = () => {
  return (
    <>
      {linksArr.map((linkItem) => {
        return (
          <li key={linkItem.href}>
            <a href={linkItem.href}>{linkItem.title}</a>
          </li>
        );
      })}
    </>
  );
};

