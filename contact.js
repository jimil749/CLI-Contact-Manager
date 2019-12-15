#!/usr/bin/env node   //shebang script. (Requires 'script-runner' package to run)

console.log('hello there');
//this module helps us design the cli using the commander.js nodejs module.
const program = require('commander');
const {prompt} = require('inquirer');   //to make the cli more intuitive
const {
  addContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact
} = require ('./logic'); // importing the logic module.

const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Enter First Name'
  },

  {
    type: 'input',
    name: 'lastname',
    message: 'Enter Last Name'
  },

  {
    type: 'input',
    name: 'phone',
    message: 'Enter Phone'
  },

  {
    type: 'input',
    name: 'email',
    message: 'Enter Email address'
  },
]

program
  .version('0.0.1')
  .description('Contact Management System')

program           //defining the cli argument to add contacts
  .command('addContact')
  .alias('a')
  .description('add a contact')
  .action((firstname, lastname, phone, email) => {
    prompt(questions).then(answers =>
      addContact(answers));
  });

program         //defining the cli argument to search for contacts.
  .command('getContact <name>')
  .alias('r')
  .description('get-Contacts')
  .action(name => getContact(name))

program       //defining the cli argument to update the contact
  .command('updateContact <_id>')
  .alias('u')
  .description('Update the contacts')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateContact(_id, answers));
  });

program     //defining the cli to delete the contact
  .command('deleteContact <_id>')
  .alias('d')
  .description('Delete the contacts')
  .action(_id => deleteContact(_id))

program   //defining the cli to show all the contacts
  .command('getContacts')
  .alias('l')
  .description('Get and Display all the contacts')
  .action(() => getContacts());
program.parse(process.argv)
