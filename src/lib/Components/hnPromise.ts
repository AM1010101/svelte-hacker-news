

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

export async function hnStoryPromise(id: number) {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((data) => {
        return data as Story;
      })
      .catch((err) => {
        console.log('err', err);
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