var farm = {
    
    // Variables
    lollipopsPlanted : 0, // The number of lollipops planted in the farm
    productionDelayType : "none", // On which delay does the farm product lollipops (day, hour, min, sec...)
    lollipopsPerDay : 0, // How many lollipops the farm produce every day
    lollipopsProduction : 0, // How many lollipops the farm produce every day, hour, min, sec.. depending on the production delay type
    maxLollipopsPerDay : 8640000, // = 100/sec
    flagsList : [" ~ ", " * ", "cnd", " ! ", " + ", " ? ", "/|\\"], // List of ascii flags which can appear on the farm
    currentFlagIndex : 0, // Index in the list of the current flag shown
    plantingButtonsStep : 0, // Step of the lollipops planting buttons : (= which buttons are shown, 1000, 100.. ?)
    
    // Functions
    calculateLollipopsPerDay : function(){
        if(this.lollipopsPlanted <= 293){ // sqrt(86400) = 293
            this.lollipopsPerDay = Math.pow(this.lollipopsPlanted, 2); // 293 will give 85849
        }
        else{ // When we're counting in lp/sec, this function is used instead of the other one. It will stabilize the curve.
            var prod = (this.lollipopsPlanted - 122) * 500; // 194 will give 86000
            if(prod < this.maxLollipopsPerDay) this.lollipopsPerDay = prod;
            else this.lollipopsPerDay = this.maxLollipopsPerDay;
        }
    },
    
    setPlantingButtonsStep : function(value){
        // Set the value
        this.plantingButtonsStep = value;
        
        // Update on page
        switch(this.plantingButtonsStep){
            case 1:
                htmlInteraction.setInnerHtml("lp_buttons", "<button class=\"home_button\" id=\"plant_1_lp\" onClick=\"farm.plantLollipops(1);\">Plant <b><span style=\"color:#79ad36\">1</span> lollipop</b></button>");
            break;
            case 2:
                htmlInteraction.setInnerHtml("lp_buttons", "<b>Plant&nbsp;&nbsp;<button class=\"home_button\" id=\"plant_1_lp\" onClick=\"farm.plantLollipops(1);\"><b><span style=\"color:#79ad36\">1</span></b></button> <button class=\"home_button\" id=\"plant_10_lp\" onClick=\"farm.plantLollipops(10);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">10</span></b></button>&nbsp;&nbsp;lollipops</b>");
            break;
            case 3:
                htmlInteraction.setInnerHtml("lp_buttons", "<b>Plant&nbsp;&nbsp;<button class=\"home_button\" id=\"plant_1_lp\" onClick=\"farm.plantLollipops(1);\"><b><span style=\"color:#79ad36\">1</span></b></button> <button class=\"home_button\" id=\"plant_10_lp\" onClick=\"farm.plantLollipops(10);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">10</span></b></button> <button class=\"home_button\" id=\"plant_100_lp\" onClick=\"farm.plantLollipops(100);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">100</span></b></button>&nbsp;&nbsp;lollipops</b>");
            break;
            case 4:
                htmlInteraction.setInnerHtml("lp_buttons", "<b>Plant&nbsp;&nbsp;<button class=\"home_button\" id=\"plant_1_lp\" onClick=\"farm.plantLollipops(1);\"><b><span style=\"color:#79ad36\">1</span></b></button> <button class=\"home_button\" id=\"plant_10_lp\" onClick=\"farm.plantLollipops(10);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">10</span></b></button> <button class=\"home_button\" id=\"plant_100_lp\" onClick=\"farm.plantLollipops(100);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">100</span></b></button> <button class=\"home_button\" id=\"plant_1000_lp\" onClick=\"farm.plantLollipops(1000);\" style=\"visibility:hidden\"><b><span style=\"color:#79ad36\">1000</span></b></button>&nbsp;&nbsp;lollipops</b>");
            break;
        }
        
        // Check the buttons
        buttons.checkLollipopsPlantingButtons();
    },
    
    clickedOnTheBigLollipop : function(){
        // Increment the current flag index
        this.setCurrentFlagIndex(this.currentFlagIndex + 1);
    },
    
    setCurrentFlagIndex : function(value){
        // Set the new value and correct it if incorrect
        this.currentFlagIndex = value;
        if(this.currentFlagIndex >= this.flagsList.length || this.currentFlagIndex < 0) this.currentFlagIndex = 0;
        
        // Update on the page
        htmlInteraction.setInnerHtml("farm_big_lollipop", this.flagsList[this.currentFlagIndex]);
    },
    
    checkVisibility : function(){
        if(objects.list.key.have){
            htmlInteraction.setElementVisibility("farm", true);
        }
    },
    
    plantLollipops : function(number){
        if(lollipops.nbrOwned >= number){
            lollipops.setNbrOwned(lollipops.nbrOwned - number);
            this.setLollipopsPlanted(this.lollipopsPlanted + number);
        }
    },
    
    setLollipopsPlanted : function(value){
        // We change the value
        this.lollipopsPlanted = value;
        
        // We update on page
        htmlInteraction.setInnerHtml("lp_planted", "Lollipops planted:&nbsp;&nbsp;<b><span style=\"color:#79ad36\">" + numberWithCommas(this.lollipopsPlanted) + "</span></b>");
        
        // We re calculate stuff
        this.calculateLollipopsPerDay();
        this.calculateLollipopsProductionFromLollipopsPerDay();
    },
    
    calculateLollipopsProductionFromLollipopsPerDay : function(){
        if(this.lollipopsPerDay < 24){
            this.setProductionDelayType("day");
            this.setLollipopsProduction(Math.floor(this.lollipopsPerDay));
        }
        else if(this.lollipopsPerDay < 1440){
            this.setProductionDelayType("hour");
            this.setLollipopsProduction(Math.floor(this.lollipopsPerDay/24));
        }
        else if(this.lollipopsPerDay < 86400){
            this.setProductionDelayType("min");
            this.setLollipopsProduction(Math.floor(this.lollipopsPerDay/1440));
        }
        else{
            this.setProductionDelayType("sec");
            this.setLollipopsProduction(Math.floor(this.lollipopsPerDay/86400));
        }
    },

    setProductionDelayType: function(value){
        this.productionDelayType = value;
    },
    
    setLollipopsProduction : function(value){
        this.lollipopsProduction = value;
        htmlInteraction.setInnerHtml("lp_production", "Production rate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span style=\"color:#79ad36\">" + numberWithCommas(this.lollipopsProduction) + "</span> lollipops/" + this.productionDelayType + "</b>");
    },
    
    setMaxLollipopsPerDay : function(value){
        // We set the max lollipops per day
        this.maxLollipopsPerDay = value;
        
        // We re calculate stuff
        this.calculateLollipopsPerDay();
        this.calculateLollipopsProductionFromLollipopsPerDay();
    }
    
};
