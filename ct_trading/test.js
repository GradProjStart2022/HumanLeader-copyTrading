const json1 = {
    "name": "John",
    "age": 30
  };
  
  const json2 = {
    "city": "New York",
    "country": "USA"
  };
  
  // JSON 객체 합치기
  const mergedJson = {
    {
    ...json1,
    ...json2},

  };
  
  console.log(mergedJson);
  