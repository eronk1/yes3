from window import *
from maze import Maze
num_rows = 12
num_cols = 16
margin = 50
screen_x = 1000
screen_y = 1000
cell_size_x = 50
cell_size_y = 50
win = Window(screen_x, screen_y)

maze = Maze(margin, margin, num_rows, num_cols, cell_size_x, cell_size_y, win)

win.wait_for_close()