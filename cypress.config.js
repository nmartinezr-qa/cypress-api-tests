const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {

      // Configuración de la base de datos
      const dbConfig = {
        user: "cypress_user",            // Nombre de usuario SQL Server
        password: "CypressPassword123!", // Contraseña del usuario SQL Server
        server: "localhost",             // Servidor (puede ser "localhost" o "localhost\\MSSQLSERVER")
        port: 1433,                      // Puerto de conexión
        database: "master",              // Base de datos a la que deseas conectarte
        options: {
          encrypt: false,                // Desactiva encrypt si estás trabajando localmente
          trustServerCertificate: true   // Confía en el certificado del servidor si es local
        }
      };

      // Registra el plugin de SQL Server
      tasks = sqlServer.loadDBPlugin(dbConfig);
      on('task', tasks);

      on('task', {
        excelToJsonConverter(filePath) {
          const result = excelToJson({
            source: fs.readFileSync(filePath)
          });
          return result;
        }
      })

    },
    specPattern: "**/*.spec.{js,ts}",
  },
});
