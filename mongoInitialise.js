var connection = new Mongo();
var db = connection.getDB('bugs');

var bugsData = [
  {
    id: "1",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 1"
  },
  {
    id: "2",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 2"
  },
  {
    id: "3",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 3"
  }
];

db.bugs.insert(bugsData);
