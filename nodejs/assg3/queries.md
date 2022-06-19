-Create user
db.createUser({user:"assg",pwd:"rgukt123", roles: ["readWrite"]})

-Get users list
db.getUsers()

-Get single user
db.getUser("assg")

-Update user
db.updateUser("assg", {roles: ["read"] , customData: {ssn: 1234}})

-Delete User
db.dropUser("assg")
