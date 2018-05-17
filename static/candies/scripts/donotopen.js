var load = {
    
    loadSave : function(){
        // buttons.js
        // The only variable says if the home buttons are disabled or not
        // We don't have to save that since the button to make a save is itself a home button

        // sword.js \*/ must be loaded before forge.js, since the forge speech may be based on the sword name.., must be loaded before candies.js too \*/
        sword.setName("wooden sword"); // sword.name string 50
        sword.setSpecialSword(false); // sword.specialSword bool
        sword.setSpecialPower(1); // sword.specialPower int
        // summonList : mobs to summon are added in the onload function, so we don't have to save it
        
        // candies.js
        candies.setNbrOwned(12000000); // candies.nbrOwned int
        candies.setNbrThrown(60); // candies.nbrThrown int
        candies.setNbrEaten(107000000000); // candies.nbrEaten int
        candies.setNbrTotal(500000000000000); // candies.nbrTotal int
        candies.setCandiesPerSecond(1); // candies.candiesPerSecond int
        
        // candiesConverter.js
        candiesConverter.setActivated(false); // candiesConverter.activated bool
        
        // castleEntrance.js
        // The variables are only used while questing, so we don't have to save them
        
        // cauldron.js
        cauldron.setBookPage(0); // cauldron.bookPage int
        cauldron.setCandiesInTheCauldron(0); // cauldron.candiesInTheCauldron int
        cauldron.setLollipopsInTheCauldron(0); // cauldron.lollipopsInTheCauldron int
        
        // chocolateBars.js
        chocolateBars.setNbrOwned(1); // chocolateBars.nbrOwned int
        
        // damage.js
        // No variables, nothing to save
        
        // drops.js
        // No variables, nothing to save
        
        // farm.js
        farm.setLollipopsPlanted(120); // farm.lollipopsPlanted int
        // farm.productionDelayType : no save, it's calculated
        // farm.lollipopsPerDay : no save, it's calculated
        // farm.lollipopsProduction : no save, it's calculated
        // farm.maxLollipopsPerDay : constant, no save
        // farm.flagsList : constant, no save
        farm.setCurrentFlagIndex(5); // farm.currentFlagIndex int
        farm.setPlantingButtonsStep(4); // farm.plantingButtonsStep int
        
        // forge.js
        // forge.shown : can't be true when we save, so we don't save it
        forge.setStep(0); // forge.step
        // forge.speech : we don't save, since it's set by the stepStep function
        
        // htmlInteraction.js
        // No variables, nothing to save
        
        // shop.js
        shop.setBuy10LollipopsButtonShown(false); // shop.buy10LollipopsButtonShown bool
        shop.setShown(true); // shop.shown bool
        shop.setTicklingStep(0); // shop.ticklingStep int
        shop.setClickingOnLollipopStep(11); // shop.clickingOnLollipopStep int
        // shop.oneLollipopPrice : calculated by the clickingOnLollipopStep, so we don't save
        // shop.tenLollipopsPrice : same as above
        // shop.currentSwordButtonId : calculated by showProduct, so we don't save
        // shop.currentSwordPrice : same as above
        
        // hut.js
        // hut.shown : can't be true when we save, so we don't save it
        hut.setStep(0); // hut.step int
        hut.setSpeech(""); // hut.speech string 1000
        
        // inventory.js
        inventory.setMagicianHatLetter("     m\n"); // inventory.magicianHatLetter string 50
        
        // jquery.tabify.js
        // nothing to save
        
        // land
        // land.list : this list is constant, so no need to save
        
        // lollipops.js
        lollipops.setNbrOwned(5000000000000); // lollipops.nbrOwned int
        lollipops.setNbrInStock(24); // lollipops.nbrInStock int
        lollipops.setNbrBought(0); // lollipops.nbrBought int
        // lollipops.stockShortage : calculated by setNbrInStock, so no need to save
        
        // main.js
        main.setNbrOfSecondsSinceLastMinInterval(0); // main.nbrOfSecondsSinceLastMinInterval int
        main.setNbrOfSecondsSinceLastHourInterval(0); // main.nbrOfSecondsSinceLastHourInterval int
        main.setNbrOfSecondsSinceLastDayInterval(0); // main.nbrOfSecondsSinceLastDayInterval int
        
        // mountGoblin.js
        mountGoblin.setBasicChestProbability(100); // mountGoblin.basicChestProbability int
        
        // peacefulForest.js
        peacefulForest.setBasicChestProbability(100); // peacefulForest.basicChestProbability int
        peacefulForest.setPoniesEncountered(0); // peacefulForest.poniesEncountered int
        
        // objects.js
        objects.setHaveObject("key", true); // objects.list.key.have bool
        objects.setHaveObject("hutMap", true); // idem
        objects.setHaveObject("wellMap", true); // idem
        objects.setHaveObject("swampMap", true); // idem
        objects.setHaveObject("boots", true); // idem
        objects.setHaveObject("magicianHat", true); // idem
        objects.setHaveObject("pinkRing", true); // idem
        objects.setHaveObject("forgeMap", true); // idem
        objects.setHaveObject("candiesConverter", true); // idem
        objects.setHaveObject("plateArmour", true); // idem
        objects.setHaveObject("cauldron", true); // idem
        objects.setHaveObject("magicalHorn", true); // idem
        objects.setHaveObject("hornOfPlenty", true); // idem
        objects.setHaveObject("oldAmulet", true); // idem
        
        // potions.js
        // potions.list : potions are added to the list in the onload function, no need to save most variables
        // the only variables we need to save is the shown one and the nbrOwned one
        potions.setPotionShown(potions.list.health, true); // potions.list.health.shown bool
        potions.setPotionShown(potions.list.escape, true); // idem
        potions.setPotionShown(potions.list.berserk, true); // idem
        potions.setPotionShown(potions.list.fireScroll, true); // idem
        potions.setPotionShown(potions.list.acidRainScroll, true); // idem
        potions.setPotionShown(potions.list.teleportScroll, true); // idem
        potions.setPotionShown(potions.list.earthquakeScroll, true); // idem
        potions.setPotionShown(potions.list.impInvocationScroll, true); // idem
        potions.setPotionShown(potions.list.majorHealth, true); // idem
        potions.setPotionShown(potions.list.invulnerability, true); // idem
        potions.setPotionShown(potions.list.turtle, true); // idem
        potions.setPotionShown(potions.list.jelly, true); // idem
        potions.setPotionShown(potions.list.seed, true); // idem
        potions.setPotionShown(potions.list.cloning, true); // idem
        potions.setPotionShown(potions.list.superman, true); // idem
        potions.setPotionShown(potions.list.gmooh, true); // idem
        
        potions.setPotionNbrOwned(potions.list.health, 10); // potions.list.health.nbrOwned int
        potions.setPotionNbrOwned(potions.list.escape, 10); // idem
        potions.setPotionNbrOwned(potions.list.berserk, 110); // idem
        potions.setPotionNbrOwned(potions.list.fireScroll, 42); // idem
        potions.setPotionNbrOwned(potions.list.acidRainScroll, 10); // idem
        potions.setPotionNbrOwned(potions.list.teleportScroll, 250); // idem
        potions.setPotionNbrOwned(potions.list.earthquakeScroll, 50); // idem
        potions.setPotionNbrOwned(potions.list.impInvocationScroll, 10); // idem
        potions.setPotionNbrOwned(potions.list.majorHealth, 10); // idem
        potions.setPotionNbrOwned(potions.list.invulnerability, 1337); // idem
        potions.setPotionNbrOwned(potions.list.turtle, 17); // idem
        potions.setPotionNbrOwned(potions.list.jelly, 17000); // idem
        potions.setPotionNbrOwned(potions.list.seed, 15); // idem
        potions.setPotionNbrOwned(potions.list.cloning, 15); // idem
        potions.setPotionNbrOwned(potions.list.superman, 15); // idem
        potions.setPotionNbrOwned(potions.list.gmooh, 80); // idem
        
        potions.updateOnPage();
        
        // quest.js
        quest.setMaxLandOrder(25); // quest.maxLandOrder, must be saved because it indicates the lands we have unlocked for the moment int
        quest.setTiredTime(0); // quest.tiredTime, must be saved because we may do a quest, have a long tired time, and save before the tired time ends int
        // All other variables should not be saved because they only describe the internal states of the quest, we we can't save while questing !
        
        // random.js
        // nothing to save
        
        // speech.js
        // nothing to save
        
        // spells.js
        // spells.list : spells are added to the list in the onload function, no need to save
        spells.setFasterCandiesFibo(1, 2); // spells.fasterCandiesFiboPrev && spells.fasterCandiesFiboCurr int && int
        
        // status.js
        // nothing to save
        
        // swamp.js
        // swamp.shown : can't be true when we save, so we don't save it
        swamp.setStep(0); // swamp.step int
        
        // tabs.js
        tabs.setAnimation("none"); // tabs.animation string 50
        
        // underwaterCave.js
        // nothing to save
        
        // wishingWell.js
        // wishingWell.shown : can't be true when we save, so we don't save it
        wishingWell.setSpeech(""); // wishingWell.speech string 1000
        wishingWell.setStep(0); // wishingWell.step int
        
        // yourself.js
        yourself.setCanSurpass(true); // yourself.canSurpass bool
        
        // castleEntrance.js
        // nothing to save, all the variables are internal states of the quest
    
        developperComputer.setWon(false);
}
    
};
