/*****************
Takes stats from the organism to be displayed in the view/stats file
*****************/

Array.matrix = function (m, n, initial) {
      var a, i, j, mat = [];
      for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
          a[j] = initial;
        }
        mat[i] = a;
      }
      return mat;
    };
/*
function State(double[][]){
	this.state = s[][]; //A 2d matrix storing values based on alive cells or dead cells (there is probably a better way)
	this.getState = function getState(){
		return state[][];
	};
}*/