import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserListModal = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const response = await axios.get();
        setUsers(response)
      } catch(err){

      }
    }
  }, [])
}