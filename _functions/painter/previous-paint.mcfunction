#bridge-file-version: #12
scoreboard objectives add paint-type dummy
scoreboard players remove @s paint-type 1
scoreboard players set @s[scores = {paint-type = ..-1}] paint-type 38
 
playsound tile.piston.in @a[r = 20] ~ ~ ~ 10 1.5 10
 
function painter/setting-message