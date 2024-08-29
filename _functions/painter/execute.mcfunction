#bridge-file-version: #27
scoreboard objectives add paint-type dummy
scoreboard players add @a paint-type 0
 
# ----------
#
# Single Color Paint
#
# -----------
 
execute as @s[scores = {paint-type = 0}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/cobblestone-0
execute as @s[scores = {paint-type = 1}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/grass-1
execute as @s[scores = {paint-type = 2}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/lava-2
execute as @s[scores = {paint-type = 3}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/planks-3
execute as @s[scores = {paint-type = 4}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/sand-4
execute as @s[scores = {paint-type = 5}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/stone-5
execute as @s[scores = {paint-type = 6}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/single/water-6
 
# ----------
#
# Various Color Paint
#
# -----------
 
execute as @s[scores = {paint-type = 7}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/cobblestone-7
execute as @s[scores = {paint-type = 8}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/grass-8
execute as @s[scores = {paint-type = 9}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/grass-9
execute as @s[scores = {paint-type = 10}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/ice-10
execute as @s[scores = {paint-type = 11}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/mycelium-11
execute as @s[scores = {paint-type = 12}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/netherrack-12
execute as @s[scores = {paint-type = 13}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/sandstone-13
execute as @s[scores = {paint-type = 14}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/stone-14
execute as @s[scores = {paint-type = 15}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/wood-15
execute as @s[scores = {paint-type = 16}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/purpurblock-16
execute as @s[scores = {paint-type = 17}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/lapisblock-17
execute as @s[scores = {paint-type = 18}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/stonebrick-18
execute as @s[scores = {paint-type = 19}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/obsidian-19
execute as @s[scores = {paint-type = 20}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/grass-20
execute as @s[scores = {paint-type = 21}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/cobbledDeepslate-21
execute as @s[scores = {paint-type = 22}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/snow-22
execute as @s[scores = {paint-type = 23}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/prismarine-23
execute as @s[scores = {paint-type = 24}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/cherryBlossom-24
execute as @s[scores = {paint-type = 25}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/mine-25
execute as @s[scores = {paint-type = 26}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/grass-26
execute as @s[scores = {paint-type = 27}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/frogLight-27
execute as @s[scores = {paint-type = 28}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/frogLight-28
execute as @s[scores = {paint-type = 29}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/frogLight-29
execute as @s[scores = {paint-type = 30}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/sculk-30
execute as @s[scores = {paint-type = 31}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/aquamarine-31
execute as @s[scores = {paint-type = 32}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/shroomlight-32
execute as @s[scores = {paint-type = 33}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/shroomlight-33
execute as @s[scores = {paint-type = 34}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/quartz-34
execute as @s[scores = {paint-type = 35}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/quartz-35
execute as @s[scores = {paint-type = 36}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/deepslate-36
execute as @s[scores = {paint-type = 37}] at @s anchored eyes positioned ~ ~ ~ run function painter/paints/mixed/stone-37