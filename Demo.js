let UserDataForm = document.getElementById("UserDataForm");
let UserList = document.getElementById("UserList");
let UserDataShowCase = document.getElementById("UserDataShowCase");
let Td = document.getElementsByTagName("td");
let UpdateBtn = document.getElementById("UpdateBtn");
let DeleteBtn = document.getElementById("DeleteBtn");

let AllUsers = [];
let CurrentData = ""

function CloseDataShowCase()
{
  UserDataShowCase.style.visibility = "hidden";
}

function OpenDataShowCase()
{
  UserDataShowCase.style.visibility = "visible";
}


function ShowUserData(e)
{
  Td[0].innerText = e.Id;
  Td[1].innerText = e.Name;
  Td[2].innerText = e.Age;

}

function handleClick(e)
{
  ShowUserData(e);
  OpenDataShowCase();
  CurrentData = e;
}


function DisplayData() {
  UserList.innerHTML = "";
  AllUsers.map((e) => {
    let NewPara = document.createElement("p");
    NewPara.innerText = e.Name;
    NewPara.addEventListener("click", ()=>{handleClick(e)});
    UserList.appendChild(NewPara);
   
  });
}

UserDataForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let CurrentId = e.target[0].value;
  let DuplicateId = false;

  AllUsers.forEach((e)=>{
    if (e.Id == CurrentId)
    {
      DuplicateId = true;
    }
  })


  if (e.target[1].value.length <=0)
  {
    alert("Name is required");

  }
  else if (DuplicateId == true)
  {
    alert("Id already exists");
    let UserDetails = 
    {
      Id: e.target[0].value,
      Name: e.target[1].value,
      Age: e.target[2].value,
    };
    let Index = AllUsers.indexOf(CurrentData);
    AllUsers[Index] = UserDetails;
    DisplayData();
    CurrentData = ""
    CloseDataShowCase();
    e.target[0].value =""
    e.target[1].value =""
    e.target[2].value =""
  }
  
  else{
    let UserDetails = {
      Id: e.target[0].value,
      Name: e.target[1].value,
      Age: e.target[2].value,
    };



  
  
    AllUsers.push(UserDetails);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    DisplayData();
  }
});


UpdateBtn.addEventListener("click", () => {

  UserDataForm.getElementsByTagName("input")[0].value = CurrentData.Id;
  UserDataForm.getElementsByTagName("input")[1].value = CurrentData.Name;
  UserDataForm.getElementsByTagName("input")[2].value = CurrentData.Age;
})


DeleteBtn.addEventListener("click", () => {

  AllUsers.splice(AllUsers.indexOf(CurrentData), 1);
  DisplayData();
})