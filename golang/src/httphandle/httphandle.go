package httphandle

import "net/http"

//Merge merge the handle func
func Merge(f ...http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		for _, function := range f {
			function(w, r)
		}
	}
}
