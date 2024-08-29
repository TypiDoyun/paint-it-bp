#bridge-file-version: #3
scoreboard objectives add eraser-scale dummy
scoreboard players add @a eraser-scale 0
scoreboard players set @a[scores = {eraser-scale = 0}] eraser-scale 1
 
execute as @s[scores = {eraser-scale = 1}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-1
execute as @s[scores = {eraser-scale = 3}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-3
execute as @s[scores = {eraser-scale = 5}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-5
execute as @s[scores = {eraser-scale = 7}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-7
execute as @s[scores = {eraser-scale = 9}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-9
execute as @s[scores = {eraser-scale = 11}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-11
execute as @s[scores = {eraser-scale = 13}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-13
execute as @s[scores = {eraser-scale = 15}] at @s anchored eyes positioned ~ ~ ~ run function eraser/scales/scale-15
playsound random.pop @a[r = 20] ~ ~ ~ 10 1.5 10