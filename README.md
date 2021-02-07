# Real-estate-purchase-agency-client-API


<br>


API made with Nodejs acting as an intermediate between the client website for the real state purchase agency ( https://github.com/real-state-masters/Real-estate-purchase-agency-client-API )  and the properties API ( https://github.com/real-state-masters/real-estate-purchase-agency-admin-API)


<br>


<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kcochoa"><img src="https://avatars.githubusercontent.com/u/48605886?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Katia Camila Valdés Ochoa</b></sub></a><br /><a href="https://github.com/real-state-masters/Real-estate-purchase-agency-client-API/commits?author=kcochoa" title="Code">💻</a> <a href="#infra-kcochoa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/bernat-ferrer/"><img src="https://avatars.githubusercontent.com/u/25109342?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bernat Ferrer</b></sub></a><br /><a href="https://github.com/real-state-masters/Real-estate-purchase-agency-client-API/commits?author=berni23" title="Code">💻</a> <a href="https://github.com/real-state-masters/Real-estate-purchase-agency-client-API/commits?author=berni23" title="Tests">⚠️</a> <a href="#projectManagement-berni23" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!




Properties  routes : 


  *  **/properties** 
  
  * method : GET 
  
  * middleware: check authentification
  
  * Description : get all properties
 
 <hr>
  
 * **/properties/:propertyID**
  
 * method : GET
  
 * middleware:  check authentification
  
 * description : get property by id
  
  <hr>
 
 *  **/services**
  
 *  method:GET
  
 *  middleware: no middleware
  
 *  description: get property by services
 
 <hr>
 
  *  **/location**
  
 *  method:GET
  
 *  middleware: no middleware
  
 *  description: get property by location
 
 <hr>
 
 * **/favorites**
 
 * method:GET
 
 * middleware: check authentification
 
 * description: get favorite properties
 
 <hr>
 
 
 Clients routes

 
 * **/clients/:clientID**
 
 * method:GET
 
 * middleware:no middleware
 
 * description: get client details
 
 
  <hr>
 
 * **/clients**
 
 * method:POST
 
 * middleware:no middleware
 
 * description: create  a client
 
 
  <hr>
 
 * **/sign-up**
 
  
 * method:POST
 
 * middleware: authentification middleware
 
 * description: sign up via firebase
 
  <hr>
 
 
 * **/favorites**
 
 *  method : POST
   
 * middleware: authentification middleware
 
 * description : mark property as favorite. send property id in the body .
 
  <hr>
 
 * **/favorites/:propertyID**
 
 * method:DELETE
 
 * middleware: authentification middleware
 
 * description: unmark property from favorites
 
  <hr>
 
 * **/favorites/unseen**
 
 * method: POST
 
 * midldeware: authentification middleware
 
 * description: mark property as ' unwanted' , and thus, wil not appear on the list anymore
 
 <hr>
 
 * **/buy**
 
 
 * method: POST
 
 * middleware: authentification middleware
 
 * description: buy property. send property id in the body
 
 
 
 
 
 
  
  
  
  
   






