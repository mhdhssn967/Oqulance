export const processDataByService = (expenses) => {
    const serviceMap = {};
  
    expenses.forEach(expense => {
      const service = expense.service;
      const amount = Number(expense.amount) || 0;
  
      if (serviceMap[service]) {
        serviceMap[service] += amount;
      } else {
        serviceMap[service] = amount;
      }
    });
  
    return Object.entries(serviceMap).map(([service, amount]) => ({
      service,
      amount
    }));
  };
  

export const processDataByType =(expenses)=>{
  const typeMap={}

  expenses.forEach(expense=>{
    const type=expense.type;
    const amount=Number(expense.amount) || 0;

    if(typeMap[type]){
      typeMap[type]+=amount;
    }else{
      typeMap[type]=amount
    }
  });

  return Object.entries(typeMap).map(([type, amount]) => ({
    type,
    amount
  }));
}

export const processDataByCategory =(expenses)=>{
  const categoryMap={}

  expenses.forEach(expense=>{
    const category=expense.category;
    const amount=Number(expense.amount) || 0;

    if(categoryMap[category]){
      categoryMap[category]+=amount;
    }else{
      categoryMap[category]=amount
    }
  });

  return Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount
  }));
}

