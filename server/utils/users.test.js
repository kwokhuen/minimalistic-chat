const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Benjamin',
      room: 'nodejs'
    },{
      id: '2',
      name: 'Mike',
      room: 'reactjs'
    },{
      id: '3',
      name: 'Feddy',
      room: 'nodejs'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'benjamin',
      room: 'justin bieber'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toInclude(resUser);
  });

  it('should return names for nodejs', () => {
    var userList = users.getUserList('nodejs');
    expect(userList).toEqual(['Benjamin', 'Feddy']);
  });

  it('should return names for reactjs', () => {
    var userList = users.getUserList('reactjs');
    expect(userList).toEqual(['Mike']);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users).toNotInclude(user);
  });

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

});
