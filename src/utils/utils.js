export const convertTime = (timestamp) => {
  const dateObject = new Date(timestamp);
  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth() + 1;
  const day = dateObject.getUTCDate();
  return `${day}-${month}-${year}`;
};

export const getTopicArticles = (articles, topic) => {
  
}