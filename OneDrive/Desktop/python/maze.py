from window import *
import time
import random
class Maze:
    def __init__(self,x1,y1,num_rows,num_cols,cell_size_x,cell_size_y,win=None):
        self._x1 = x1
        self._y1 = y1
        self._num_rows = num_rows
        self._num_cols = num_cols
        self._cell_size_x = cell_size_x
        self._cell_size_y = cell_size_y
        self._win = win
        self._cell = []
        self._create_cells()
        self._break_entrance_and_exit()
        self._break_walls_r(0,0)
        self._reset_cells_visted()
        self._solve()

    def _create_cells(self):
        for i in range(self._num_rows):
            temp = []
            for j in range(self._num_cols):
                temp.append(Cell(self._win))
            self._cell.append(temp)
        for i in range(self._num_rows):
            for j in range(self._num_cols):
                self._draw_cells(i,j)

    def _draw_cells(self,i,j):
        if self._win == None:
            return
        x1 = self._x1 + j*self._cell_size_x
        y1 = self._x1 + i*self._cell_size_y
        x2 = x1+self._cell_size_x
        y2 = y1+ self._cell_size_y
        self._cell[i][j].draw(x1,y1,x2,y2)
        self._animate()
    
    def _animate(self):
        self._win.redraw()
        time.sleep(0.02)
    def _break_entrance_and_exit(self):
        self._cell[0][0].has_top_wall = False
        self._draw_cells(0,0)
        self._cell[self._num_rows-1][self._num_cols-1].has_bottom_wall = False
        self._draw_cells(self._num_rows-1,self._num_cols-1)
        
    def _break_walls_r(self,i,j):
        self._cell[i][j].visited = True
        while True:
            checkPossible = []
            possible_direction = 0
            #up
            if i > 0 and not self._cell[i-1][j].visited:
                checkPossible.append((i-1,j))
                possible_direction += 1
            #down
            if i<self._num_rows-1 and not self._cell[i+1][j].visited:
                checkPossible.append((i+1,j))
                possible_direction += 1
            #left
            if j>0 and not self._cell[i][j-1].visited:
                checkPossible.append((i,j-1))
                possible_direction += 1
            #right
            if j<self._num_cols-1 and not self._cell[i][j+1].visited:
                checkPossible.append((i,j+1))
                possible_direction += 1
            
            if possible_direction == 0:
                self._draw_cells(i,j)
                return

            ran_num = random.randrange(possible_direction)
            val = checkPossible[ran_num]
            #bottom
            if val[0] > i:
                self._cell[i][j].has_bottom_wall = False
                self._cell[i+1][j].has_top_wall = False
            
            #top
            if val[0] < i:
                self._cell[i][j].has_top_wall = False
                self._cell[i-1][j].has_bottom_wall = False
            
            #left
            if val[1] < j:
                self._cell[i][j].has_left_wall = False
                self._cell[i][j-1].has_right_wall = False
            #right
            if val[1] > j:
                self._cell[i][j].has_right_wall = False
                self._cell[i][j+1].has_left_wall = False
            
            self._break_walls_r(val[0],val[1])
    def _reset_cells_visted(self):
        for i in range(self._num_rows):
            for j in range(self._num_cols):
                self._cell[i][j].visited = False
    def _solve(self):
        return self._solve_r(0,0)
    
    def _solve_r(self,i,j):
        self._animate()
        self._cell[i][j].visited = True

        if i==self._num_rows-1 and j==self._num_cols-1:
            return True
        #up
        if i>0 and not self._cell[i][j].has_top_wall and not self._cell[i-1][j].visited:
            self._cell[i][j].draw_move(self._cell[i-1][j])
            if self._solve_r(i-1,j):
                return True
            else:
                self._cell[i][j].draw_move(self._cell[i-1][j],True)
        #down
        if i<self._num_rows-1 and not self._cell[i][j].has_bottom_wall and not self._cell[i+1][j].visited:
            self._cell[i][j].draw_move(self._cell[i+1][j])
            if self._solve_r(i+1,j):
                return True
            else:
                self._cell[i][j].draw_move(self._cell[i+1][j],True)
        #left
        if j>0 and not self._cell[i][j].has_left_wall and not self._cell[i][j-1].visited:
            self._cell[i][j].draw_move(self._cell[i][j-1])
            if self._solve_r(i,j-1):
                return True
            else:
                self._cell[i][j].draw_move(self._cell[i][j-1],True)
        #right
        if j<self._num_cols-1 and not self._cell[i][j].has_right_wall and not self._cell[i][j+1].visited:
            self._cell[i][j].draw_move(self._cell[i][j+1])
            if self._solve_r(i,j+1):
                return True
            else:
                self._cell[i][j].draw_move(self._cell[i][j+1],True)
        return False
