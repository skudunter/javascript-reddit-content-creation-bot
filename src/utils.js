const getRandomPost = (posts) => {
  let max = Math.round(posts.data.children.length * 0.5);
  let index = Math.round(getRandomValue(0, max));
  return {
    id: posts.data.children[index].data.id,
    title: posts.data.children[index].data.title,
    description: posts.data.children[index].data.selftext
  };
};
export default getRandomPost;
function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}
