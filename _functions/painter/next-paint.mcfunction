#bridge-file-version: #25
scoreboard objectives add paint-type dummy
scoreboard players add @s paint-type 1
scoreboard players set @s[scores = {paint-type = 39..}] paint-type 0
 
playsound tile.piston.out @a[r = 20] ~ ~ ~ 10 1.5 10
 
function painter/setting-message