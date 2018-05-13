extern crate futures;
#[macro_use]
extern crate mysql_async as my;
extern crate tokio_core as tokio;

use futures::Future;
use my::prelude::*;
use tokio::reactor::Core;

use std::{thread, time};

fn main() {
    let mut lp = Core::new().unwrap();
    let pool = my::Pool::new("mysql://root:password@localhost:3307", &lp.handle());

    loop {
        let duration = time::Duration::from_secs(1);
        thread::sleep(duration);
        println!("this script does, whatever this script does...");
    }
}
