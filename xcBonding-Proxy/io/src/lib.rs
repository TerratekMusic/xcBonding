#![no_std]

use gmeta::{InOut, In, Metadata};
use gstd::{prelude::*, ActorId};

pub struct ProxyMetadata;

impl Metadata for ProxyMetadata {
  type Init = In<ActorId>;
  type Handle = InOut<Action, Event>;
  type Others = ();
  type Reply = ();
  type Signal = ();
  type State = ();
}

#[derive(TypeInfo, Decode, Encode)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum Action {
  BuyTokens{
    amount: u64,
    bonding_program_id: ActorId,
  },
  SetBondingProgram(ActorId),
  
}


#[derive(TypeInfo, Decode, Encode)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum Event{
  TokensBought(u64), 
  MessageSent,
}