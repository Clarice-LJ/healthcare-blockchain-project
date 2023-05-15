This is a Proof of Concept blockchain-based solution for healthcare data management. 
The source code for the project can be access at the GitHub: https://github.com/Clarice-LJ/healthcare-blockchain-project

The files in the healthcare-app-v2 directory are for the implementation of the Web Application, and other files are for the delpoyment of the Hyperledger Composer network. 
Specifically, the "permissions.acl" file, the "lib/logic.js" file, and the "models/org.healthcare.network.cto" file are three files defining the structure of the network, and they are packaged into one "healthcare-network@0.0.6.bna" file for deploying the network. The "networkadmin.card" is used to connect to the network.

In the "healthcare-app-v2" directory, the primary code for the pages in the app are under the path "healthcare-app-v2/src/app/". 
There is one directory for each page (or component in Angular), consisting of an HTML file, a CSS file, a component TypeScript file and a service TypeScript file. 
The "app.component" files are for the main pages, and the "app-routing" file gives an overview of how these components are combined and used for navigation. 

The pre-requisites are listed below:
– Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
– Docker Engine: Version 17.03 or higher
– Docker-Compose: Version 1.8 or higher
– Node: 8.9 or higher (note version 9 is not supported)
– npm: v5.x
– git: 2.9.x or higher
– Python: 2.7.x
– A code editor of your choice, we recommend VSCode.

We recommend to have at least 4GB of memory. The project is built in Ubuntu 16.04LTS operating system. 

To run the application, the Hyperledger Fabric environment is required, and the set up steps are given in the User Manual.
To change the define of the network and deploy an upgrade version, developer can find the helpful steps in the Maintenance Manual. 

The following steps are recommended for running the App:
1. Install all the prerequisites.
2. Install the official Hyperledger Fabric runtime "fabric-dev-servers".
3. Set up the environment by using the "fabric-dev-servers" runtime.
4. Deploy the network on the runtime by using "healthcare-network@0.0.6.bna" file.
5. Generate the Restful Server for interacting with the network.
6. Run the application. 

(The detailed command are given in the user manual)