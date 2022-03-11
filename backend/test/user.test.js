// use the path of your model
const User = require("../models/userModel")
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/mobile';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});
describe('User Schema test anything', () => {
    //the code below is for insert testing
    it('Add User testing anything', () => {
        const User = {
            'name': 'Pema',
            'email': 'pema12@gmail.com'
        };
        return User.create(User)
            .then((userData) => {
                expect(userData.name).toEqual('Pema');

            });
    });
    //he code below is for delete testing
    //  it('to test the delete product is working or not', async () => {
    //  const status = await User.deleteMany();
    // });
    // it('to test the update', async () => {
    //  return User.findOneAndUpdate({_id :Object('620e0c12ac7e2e4073733a8e')}, 
    // {$set : {username:'Ishmarika'}})
    //  .then((pp)=>{
    //  });
    // });
})


// const Resources = require("../models/userModel");
// const mongoose = require("mongoose");

// const url = "mongodb://127.0.0.1:27017/mobile";

// beforeAll(async() => {
//     await mongoose.connect(url, { useNewUrlParser: true });
// });
// afterAll(async() => {
//     await mongoose.connection.close();
// });

// // Insert testing
// describe('User Schema Testing', () => {
//     it('Add User', () => {
//         jest.setTimeout(30000);
//         const user = {
//             'name': "saurabh",
//             'email': "saurabhstha12@gmail.com",
//         }

//         return User.create(user).then((userData) => {
//             expect(userData.title).toEqual('');

//         });
//     });
// })