# desafio-tecnico-backend-
API REST - SALVANDO,DELETANDO E CONSULTANDO DADOS DE UM ARQUIVO JSON.


````
// JSON ESPARADO PARA DELETAR (como não sei se era permitido passar um id fiz a lógica deletando e pela data )
{
   "day":"26-01-2018",
   "daily":false,
   "intervals":{
      "start":"22:30",
      "end":"15:00"
   },
   "weekly":"true",
   "daysWeek":"segunda",
   "intervalsWeekly":{
      "start":"20:30",
      "end":"15:00"
   }
}



//JSON PARA PESQUISAR FILTRANDO POR DATA.
{
"dayStart":"26-01-2018",
"dayEnd":"26-01-2019",
}



//cadastrar horário para um determinado dia.
    {
       "day":"26-01-2018",
       "daily":true,
       "intervals":[
          {
             "start":"20:30",
             "end":"15:00"
          },
          {
             "start":"20:30",
             "end":"15:00"
          },
          {
             "start":"20:30",
             "end":"15:00"
          },
          {
             "start":"20:30",
             "end":"15:00"
          }
       ],
       "weekly":false,
       "daysWeek":[
       ],
       "intervalsWeekly":{

       }
    }
	
-----------------
json para cadastrar horários em dias da semana

    {
       "day":"",
       "daily":false,
       "intervals":[

       ],
       "weekly":true,
       "daysWeek":["segunda","terça","quarta"],
       "intervalsWeekly":{
             "start":"20:30",
             "end":"15:00"
       }
    }
	
rotas
router.get("/list",AgendaController.list);
router.get("/search",AgendaController.search);
router.post("/create",AgendaController.create);
router.delete("/delete",AgendaController.delete);
