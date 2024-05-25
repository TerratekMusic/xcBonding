#![no_std]

use gstd::{prelude::*,msg, ActorId, MessageId};


static mut BOND: Option<Bond> = None;

struct Bond{
    bonding_program_id: ActorId, // smart program del bonding variable y muliple para muchos proyectos
    ft_token: ActorId, //Fungible Token for bond purchase
    bond_token: ActorId, //Bond token of the project
    price: u128, //price of the token
    amount: u128, //amount of the token
    vesting_period: u64, //vesting period of the token
}