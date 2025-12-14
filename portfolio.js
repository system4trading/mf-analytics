export function xirr(cashflows){
  let rate=0.1;
  for(let i=0;i<100;i++){
    let f=0,df=0;
    cashflows.forEach(c=>{
      f+=c.amount/((1+rate)**(c.t/365));
      df+=-c.amount*(c.t/365)/((1+rate)**((c.t/365)+1));
    });
    rate-=f/df;
  }
  return rate;
}

