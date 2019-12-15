const mongoose = require('mongoose');
const assert = require('assert');     //module to perform unit testing

mongoose.Promise = global.Promise;
//making connection to the remote database
const url = 'mongodb://localhost:27017/contact-manager';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology : true});
const db = mongoose.connection;
db.once('open', _ => {
  //console.log('Database Connected: ', url);
})

db.on('error', err =>{
  //console.error('Connection error: ', err);
})
//method to convert into lower Case
function toLower(v){
  return v.toLowerCase();
}

//defining the database schema
const contactSchema = mongoose.Schema({
  firstname : {type: String, set : toLower},
  lastname : {type: String, set : toLower},
  phone : {type : String, set: toLower},
  email : {type : String, set : toLower}
});

const Contact = mongoose.model('Contact', contactSchema);
//function to addContact to the database

const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err);
    console.info('New Contact added');
    db.close();
  })
};

//function to get contacts from the database

const getContact = (name) => {
  const search = new RegExp(name, 'i');
  Contact.find({$or: [{firstname:search}, {lastname: search}]})
  .exec((err, contact) => {
    assert.equal(null, err);
    console.info(contact);
    console.info(`${contact.length} matches`);
    db.close();
  });
};
//method to update a contact
const updateContact = (_id, contact) => {
  Contact.update({_id}, contact)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info("Updated Successfully");
    db.close();
  });
};
//method to delete a contact
const deleteContact = (_id) => {
  Contact.remove({_id})
  .exec((err, status) => {
    assert.equal(null, err);
    console.info("Deleted Successfully");
    db.close();
  });
};
//method to list all contacts from the Database
const getContacts = () => {
  Contact.find()
  .exec((err, contacts) => {
    assert.equal(null, err);
    console.info(contacts);
    console.info(`${contacts.length} matches`);
    db.close();
  });
}

//exporting all the modules.
module.exports = {
  addContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact
};
