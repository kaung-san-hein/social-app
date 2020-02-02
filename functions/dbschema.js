let db = {
  users: [
    {
      userId: "1",
      email: "user@gmail.com",
      handle: "user",
      createdAt: "27/1/2020",
      imageUrl: "https://image/12345.png",
      bio: "Hello",
      website: "https://user.com",
      location: "London, UK"
    }
  ],
  scremas: [
    {
      userHandle: "user",
      body: "This is a sample scream",
      createdAt: "27/1/2020",
      likeCount: 5,
      commentCount: 5
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "scream1",
      body: "nice one mate!",
      createdAt: "27/1/2020"
    }
  ]
};
const userDetails = {
  // Redux
  credentials: {
    userId: "1",
    email: "user@gmail.com",
    handle: "user",
    createdAt: "27/1/2020",
    imageUrl: "https://image/12345.png",
    bio: "Hello",
    website: "https://user.com",
    location: "London, UK"
  },
  likes: [
    {
      userHandle: "user",
      screamId: "scream1"
    },
    {
      userHandle: "user",
      screamId: "scream1"
    }
  ]
};
