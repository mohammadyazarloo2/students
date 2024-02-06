function getUser(userId) {
  return new Promise((resolve, reject) => {
    console.log("get the user from database");
    setTimeout(() => {
      resolve({
        userId: userId,
        username: "admin",
      });
    }, 1000);
  });
}

function getServices(user) {
  return new Promise((resolve, reject) => {
    console.log("get the servies of " + user.username + " from the Api");
    setTimeout(() => {
      resolve(["email", "vpn", "cdn"]);
    }, 3 * 1000);
  });
}

function getServicesCost(servies) {
  return new Promise((resolve, reject) => {
    console.log("caculate the service cost of " + servies);
    setTimeout(() => {
      resolve(servies.length * 100);
    }, 2 * 1000);
  });
}
getUser(100).then(getServices).then(getServicesCost).then(console.log);



let songs=[
  {
      name:'duel',
      artist:'ali sorena',
      img:'../img/3',
      audio:'1',
  },
  {
      name:'kalame obor',
      artist:'pishro',
      img:'../img/3',
      audio:'2',
  }
]
