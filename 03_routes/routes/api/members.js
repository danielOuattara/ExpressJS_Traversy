const express = require('express');
const router = express.Router();
const membersData = require('./../../Data/membersData');
const { v4: uuidv4 } = require('uuid');
const members = require('./../../Data/membersData');


/* Members API Routes
------------------------ */

router.get('/', (req, res) => {
   res.json(members);
});

router.get('/:memberId', (req, res) => {
   const member = members.find(member => member.id === parseInt(req.params.memberId));
   if(!member) {
     return res.status(400).json(`No One found with id ${req.params.memberId}`)
   }
    return res.status(200).json(member);
});

router.post('/', (req, res) => {
   const { name, email } = req.body;
   const newMember = {
      id: uuidv4(),
      name,
      email,
      status: false
   }

   if (!name || !email) {
      return res.status(400).json({message: " Please, provide valide name and email"})
   }
   membersData.push(newMember)
   return res.status(201).json({newMember, membersData})
});


router.put('/:memberId', (req,res) => {
   const member = members.find((member) => member.id === +req.params.memberId);
   if(!member) {
      return res.status(404).json({message: `No mumber found with id : ${req.params.memberId}`})
   } else {
      const { name, email, status} = req.body;
      name ? member.name = name : member.name;
      email ? member.email = email: member.email;
      status === false ? member.status = status : member.status = true
   }
   return res.status(201).json({message:`Member successfuly updated `, member})
});


router.delete('/:memberId', (req,res) => {
   const memberIndex = members.findIndex((member) => member.id === +req.params.memberId);
   if(memberIndex === -1) {
      return res.status(404).json({message: `No mumber found with id : ${req.params.memberId}`})
   } else {
      members.splice(memberIndex, 1);
   }
   return res.status(201).json({message:`Member successfuly removed`, members})
});


module.exports = router;
