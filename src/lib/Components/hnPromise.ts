interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

export let hnTopStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnNewStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnBestStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnAskStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnShowStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnJobStorys = fetch(
  `https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export let hnMaxItem = fetch(
  `https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty`
)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

export async function hnStoryPromise(id: number): Promise<Story> {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  )
    .then((res) => res.json())
    .then((data) => {
      return data as Story;
    });
}

export async function hnCommentPromise(id: number) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  )
    .then((res) => res.json())
    .then((data) => {
      return data as Comment;
    })
    .catch((err) => {
      console.log('err', err);
    });
}
