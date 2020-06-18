const AgendaService = require("../services/AgendaServices");

class AgendaController{

    

    async create(req,res){

      var agenda = await AgendaService.create(req.body);
      res.send(agenda);
    }


    async list(req,res){
      var agenda = await AgendaService.list();
      res.send(agenda);
    }

    async search(req,res){
      var agenda = await AgendaService.search(req.body);
      res.send(agenda);
    }

    async delete(req,res){

      var agenda = await AgendaService.delete(req.body);
      res.send(agenda);
    }

}

module.exports = new AgendaController();