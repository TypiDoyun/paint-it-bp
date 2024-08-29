#bridge-file-version: #5
scoreboard objectives add eraser-scale dummy
scoreboard players add @s eraser-scale 0
scoreboard players set @s[scores = {eraser-scale = 0}] eraser-scale 1
scoreboard players add @s eraser-scale 2
playsound tile.piston.out @a[r = 20] ~ ~ ~ 10 1.5 10
scoreboard players set @s[scores = {eraser-scale = 16..}] eraser-scale 1
function eraser/setting-message