export const getPreparedNewsItems = (newsArr) => {
  return newsArr.map(newsItem => getProperObj(newsItem))
};

const getProperObj = (obj) => {
  return {
    id: obj.id,
    rating: obj.score,
    authorName: obj.by,
    linkToNews: obj.url,
    postingHours: getTimeAgo(obj.time),
    commentsCount: obj.descendants,
    title: obj.title,
  };
};

const getTimeAgo = (timestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const timeDifference = currentDate - targetDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};
