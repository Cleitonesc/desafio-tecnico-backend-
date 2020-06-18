const fs = require("fs"); 

class AgendaService{

    async  list(){ 
        return this.LerArquivo();
    }
     conversorData(data) {
        const [dia, mes, ano] = data.split("-");
        return new Date(ano,mes-1,dia);
      }
      
    async  search(dados){ 
        const arquivo = this.LerArquivo();
        var retorno="";


        for (var i = 0; i < arquivo.length; i++){
           var horarios = JSON.stringify(arquivo[i].intervals);

           if(this.conversorData(dados.dayStart) >= this.conversorData(arquivo[i].day) && this.conversorData(arquivo[i].day)<=this.conversorData(dados.dayEnd))
            { // data está no período solicitado pelo usuário?

                console.log(this.conversorData(arquivo[i].day));
                retorno += `{day: "${arquivo[i].day}",intervals:"+'"'${JSON.stringify(arquivo[i].intervals)}+'"'"},`;
            
                //retorno+= "{"+"day:"+'"'+arquivo[i].day +'"'+",intervals:"+horarios+"},"
            }
        }
        
        var newJson= "["+retorno+"]"; //Finalizadno json

        console.log(newJson);
       // console.log(JSON.parse(JSON.stringify(newJson)));
        
        return arquivo;
    }

    async create(dados){

        if(dados.daily){  //diário?  
        
        var x = dados.intervals;
        for(var i=0; i<x.length;i++){ //obter todos os objetos intervals
          
        // console.log(intervalos);
         const arquivo = this.LerArquivo();
         if(arquivo){ // Existe dados no arquivo?
 
             const diaSelecionado = arquivo.findIndex((agenda)=>agenda.day==dados.day); //obtendo índice do dia que deseja agendar
             
             if(diaSelecionado<0){ // para o dia informado não existe  agendamento?
                 arquivo.push({"day":dados.day,"daily":dados.daily,"intervals":[{"start":x[i].start,"end":x[i].end,"weekly":false, "daysWeek":[],"intervalsWeekly":{}}]}); // adiciona o dia no array 
             }else{
                arquivo[diaSelecionado].intervals.push({"start":x[i].start,"end":x[i].end,"weekly":false, "daysWeek":[],"intervalsWeekly":{}}); //adicionar horários ao dia solicitado.
             }
             
             this.EscreverArquivo(arquivo);
         }  
         else{
             this.EscreverArquivo([{"day":dados.day,"daily":dados.daily,"intervals":[{"start":x[i].start,"end":x[i].end,"weekly":false, "daysWeek":[],"intervalsWeekly":{}}]}]);
         }

         } 
        }if(dados.weekly){ // caso seja semanal

            const arquivo = this.LerArquivo();
            var x = dados.intervalsWeekly;
           
            
            for (var i = 0; i < dados.daysWeek.length; i++) { // obtendo os dias da semana
                const diaSelecionado = arquivo.findIndex((agenda)=>agenda.weekly==true);
                arquivo[diaSelecionado].daysWeek.push(dados.daysWeek[i]);  // adicionando os dias da semana
                
                arquivo[diaSelecionado].intervalsWeekly=({"start":x.start,"end":x.end}); //adicionar horários.
               
                this.EscreverArquivo(arquivo);
              }
               
        }
        return (dados);
     }
    async delete(dados){

        const arquivo =  this.LerArquivo();
        if(dados.daily){// deseja deletar um horário de uma data?
            const diaSelecionado = arquivo.findIndex((agenda)=>agenda.day==dados.day); //obtendo índice do dia que deseja deletar
        
            if(diaSelecionado>=0){ //a data que deseja deletar existe?
            const horaSelecionada  = arquivo[diaSelecionado].intervals.findIndex((agenda)=>agenda.start==dados.intervals.start && agenda.end==dados.intervals.end);
            console.log(horaSelecionada);
            if(horaSelecionada>=0){ // o horário que seja deletar existe?

                arquivo[diaSelecionado].intervals.splice(horaSelecionada,1);  //removendo o horário.  
                this.EscreverArquivo(arquivo);
                return true;
            }else{
                return false;
                }
            }else{
                return false;
            }
        }if(dados.weekly){// deseja deletar um dia da semana?
            
            const diaSelecionado = arquivo.findIndex((agenda)=>agenda.weekly==true);
            
            for (var i = 0; i < arquivo[diaSelecionado].daysWeek.length; i++) { //percorrendo o array daysWeek do arquivo json 
               
                if(arquivo[diaSelecionado].daysWeek[i]==dados.daysWeek){ // se encontrar o dia da semana remove do array no arquivo json
                  //  arquivo[diaSelecionado].daysWeek.splice(arquivo[diaSelecionado].daysWeek[i],1);
                }

            }
            console.log(arquivo);
           // this.EscreverArquivo(arquivo);

        }

   
    }

    async EscreverArquivo(dados){ // método responsável por escrever no arquivo
      const updateFile = JSON.stringify(dados);
      fs.writeFileSync("./data/agenda.json",updateFile,"utf-8");
    }

  
    LerArquivo(){
        const arquivo = fs.readFileSync("./data/agenda.json","utf-8"); 
        if(arquivo!=''){
            return JSON.parse(arquivo);
        }else{
            return false;
        }
    }


      

}

module.exports = new AgendaService();