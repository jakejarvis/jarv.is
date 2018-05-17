var code = "";

function save() {             
  $.ajax({
    type: "POST",
    url: "scripts/save.php",
    data: {
      swordName : sword.name,
      swordSpecialSword : sword.specialSword,
      swordSpecialPower : sword.specialPower,
      candiesNbrOwned : candies.nbrOwned,
      candiesNbrThrown : candies.nbrThrown,
      candiesNbrEaten : candies.nbrEaten,
      candiesNbrTotal : candies.nbrTotal,
      candiesCandiesPerSecond : candies.candiesPerSecond,
      candiesConverterActivated : candiesConverter.activated,
      cauldronBookPage : cauldron.bookPage,
      cauldronCandies : cauldron.candiesInTheCauldron,
      cauldronLollipops : cauldron.lollipopsInTheCauldron,
      chocolateBarsNbrOwned : chocolateBars.nbrOwned,
      farmLollipopsPlanted : farm.lollipopsPlanted,
      farmCurrentFlagIndex : farm.currentFlagIndex,
      farmPlantingButtonsStep : farm.plantingButtonsStep,
      forgeStep : forge.step,
      shopLollipopsButtonsShown : shop.buy10LollipopsButtonShown,
      shopShown : shop.shown,
      shopTicklingStep : shop.ticklingStep,
      shopClickingOnLollipopStep : shop.clickingOnLollipopStep,
      hutStep : hut.step,
      hutSpeech : hut.speech,
      inventoryMagicianHatLetter : inventory.magicianHatLetter,
      lollipopsNbrOwned : lollipops.nbrOwned,
      lollipopsNbrInStock : lollipops.nbrInStock,
      lollipopsNbrBought : lollipops.nbrBought,
      mainNbrOfSecondsSinceLastMinInterval : main.nbrOfSecondsSinceLastMinInterval,
      mainNbrOfSecondsSinceLastHourInterval : main.nbrOfSecondsSinceLastHourInterval,
      mainNbrOfSecondsSinceLastDayInterval : main.nbrOfSecondsSinceLastDayInterval,
      mountGoblinBasicChestProbability : mountGoblin.basicChestProbability,
      peacefulForestBasicChestProbability : peacefulForest.basicChestProbability,
      peacefulForestPoniesEncountered : peacefulForest.poniesEncountered,
      objectsHaveObjectKey : objects.list.key.have,
      objectsHaveObjectHutMap : objects.list.hutMap.have,
      objectsHaveObjectWellMap : objects.list.wellMap.have,
      objectsHaveObjectSwampMap : objects.list.swampMap.have,
      objectsHaveObjectBoots : objects.list.boots.have,
      objectsHaveObjectMagicianHat : objects.list.magicianHat.have,
      objectsHaveObjectPinkRing : objects.list.pinkRing.have,
      objectsHaveObjectForgeMap : objects.list.forgeMap.have,
      objectsHaveObjectCandiesConverter : objects.list.candiesConverter.have,
      objectsHaveObjectPlateArmour : objects.list.plateArmour.have,
      objectsHaveObjectCauldron : objects.list.cauldron.have,
      objectsHaveObjectMagicalHorn : objects.list.magicalHorn.have,
      objectsHaveObjectHornOfPlenty : objects.list.hornOfPlenty.have,
      objectsHaveObjectOldAmulet : objects.list.oldAmulet.have,
      potionsShownHealth : potions.list.health.shown,
      potionsShownEscape : potions.list.escape.shown,
      potionsShownBerserk : potions.list.berserk.shown,
      potionsShownFireScroll : potions.list.fireScroll.shown,
      potionsShownAcidRainScroll : potions.list.acidRainScroll.shown,
      potionsShownTeleportScroll : potions.list.teleportScroll.shown,
      potionsShownEarthquakeScroll : potions.list.earthquakeScroll.shown,
      potionsShownImpInvocationScroll : potions.list.impInvocationScroll.shown,
      potionsShownMajorHealth : potions.list.majorHealth.shown,
      potionsShownInvulnerability : potions.list.invulnerability.shown,
      potionsShownTurtle : potions.list.turtle.shown,
      potionsShownJelly : potions.list.jelly.shown,
      potionsShownSeed : potions.list.seed.shown,
      potionsShownCloning : potions.list.cloning.shown,
      potionsShownSuperman : potions.list.superman.shown,
      potionsShownGmooh : potions.list.gmooh.shown,
      potionsNbrOwnedHealth : potions.list.health.nbrOwned,
      potionsNbrOwnedEscape : potions.list.escape.nbrOwned,
      potionsNbrOwnedBerserk : potions.list.berserk.nbrOwned,
      potionsNbrOwnedFireScroll : potions.list.fireScroll.nbrOwned,
      potionsNbrOwnedAcidRainScroll : potions.list.acidRainScroll.nbrOwned,
      potionsNbrOwnedTeleportScroll : potions.list.teleportScroll.nbrOwned,
      potionsNbrOwnedEarthquakeScroll : potions.list.earthquakeScroll.nbrOwned,
      potionsNbrOwnedImpInvocationScroll : potions.list.impInvocationScroll.nbrOwned,
      potionsNbrOwnedMajorHealth : potions.list.majorHealth.nbrOwned,
      potionsNbrOwnedInvulnerability : potions.list.invulnerability.nbrOwned,
      potionsNbrOwnedTurtle : potions.list.turtle.nbrOwned,
      potionsNbrOwnedJelly : potions.list.jelly.nbrOwned,
      potionsNbrOwnedSeed : potions.list.seed.nbrOwned,
      potionsNbrOwnedCloning : potions.list.cloning.nbrOwned,
      potionsNbrOwnedSuperman : potions.list.superman.nbrOwned,
      potionsNbrOwnedGmooh : potions.list.gmooh.nbrOwned,
      questMaxLandOrder : quest.maxLandOrder,
      questTiredTime : quest.tiredTime,
      spellsFasterCandiesFibo1 : spells.fasterCandiesFiboPrev,
      spellsFasterCandiesFibo2 : spells.fasterCandiesFiboCurr,
      swampStep : swamp.step,
      tabsAnimation : tabs.animation,
      wishingWellSpeech : wishingWell.speech,
      wishingWellStep : wishingWell.step,
      yourselfCanSurpass : yourself.canSurpass,
      developperComputerWon : developperComputer.won
    },
    success: function(msg){
        if(msg=="error"){

            alert("There was a problem while saving. Please go nicely bother Scrabble or try again later. :-(");   
            $("span#save").html("");

        }else{

            code = msg.substring(0,5);
            alert('You saved successfully under the code "' + msg + '". Write this down somewhere, you will need it later!');
            $("span#save").html("&nbsp;&nbsp;&nbsp;&nbsp;You can also bookmark <a href=\"/index.php?pass=" + code + "\">this link</a> to load the save.");

        }
    }
  });
  return false;
}
