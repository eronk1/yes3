from tkinter import * # * just means all

class Window:
    def __init__(self,height,width):
        self.__root = Tk()
        self.__root.title("")
        self.__canvas = Canvas(self.__root,height=height,width=width)
        self.__canvas.pack()
        self.__running = False
        self.__root.protocol("WM_DELETE_WINDOW", self.close())
    def redraw(self):
        self.__root.update_idletasks()
        self.__root.update()
    def wait_for_close(self):
        self.__running = True
        while self.__running:
            self.redraw()
    def close(self):
        self.__running = False
    def draw_line(self,line,fill_color):
        line.draw(self.__canvas,fill_color)
class Point:
    def __init__(self,x,y):
        self.x = x
        self.y = y
class Line:
    def __init__(self,point1,point2):
        self.p1 = point1
        self.p2 = point2
    def draw(self,canvas,color):
        canvas.create_line(self.p1.x,self.p1.y,self.p2.x,self.p2.y,fill=color,width=5)
        canvas.pack()
class Cell:
    def __init__(self,win=None):
        self.has_left_wall = True
        self.has_right_wall = True
        self.has_top_wall = True
        self.has_bottom_wall = True
        self._x1 = None
        self._x2 = None
        self._y1 = None
        self._y2 = None
        self._win = win
        self.visited = False
    def draw(self,x1,y1,x2,y2):
        if self._win == None:
            return
        self._x1 = x1
        self._x2 = x2
        self._y1 = y1
        self._y2 = y2
        if self.has_left_wall:
            line = Line(Point(x1, y1), Point(x1, y2))
            self._win.draw_line(line,"black")
        else:
            line = Line(Point(x1, y1), Point(x1, y2))
            self._win.draw_line(line,"white")

        if self.has_top_wall:
            line = Line(Point(x1, y1), Point(x2, y1))
            self._win.draw_line(line,"black")
        else:
            line = Line(Point(x1, y1), Point(x2, y1))
            self._win.draw_line(line,"white")
            
        if self.has_right_wall:
            line = Line(Point(x2, y1), Point(x2, y2))
            self._win.draw_line(line,"black")
        else:
            line = Line(Point(x2, y1), Point(x2, y2))
            self._win.draw_line(line,"white")

        if self.has_bottom_wall:
            line = Line(Point(x1, y2), Point(x2, y2))
            self._win.draw_line(line,"black")
        else:
            line = Line(Point(x1, y2), Point(x2, y2))
            self._win.draw_line(line,"white")
    def draw_move(self, to_cell, undo=False):
        if self._win is None:
            return
        x_mid = (self._x1 + self._x2) / 2
        y_mid = (self._y1 + self._y2) / 2

        to_x_mid = (to_cell._x1 + to_cell._x2) / 2
        to_y_mid = (to_cell._y1 + to_cell._y2) / 2

        fill_color = "red"
        if undo:
            fill_color = "gray"
        if self._x1 != to_cell._x1 or self._y1 != to_cell._y1:
            line = Line(Point(x_mid,y_mid),Point(to_x_mid,to_y_mid))
            self._win.draw_line(line,fill_color)