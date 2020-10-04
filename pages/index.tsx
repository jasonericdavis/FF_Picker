const getData = async () =>  {
  return fetch('/data.json').then(response => response.json())
}
const HomePage = () => {
  const data = getData().then(data => {
    console.log(data)
    return data;
  })
  
  return <div>Welcome to the homepage</div>
}
  
  export default HomePage