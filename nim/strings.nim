import strutils

proc trim*(str: string): string=
    let strseq=str.split()
    block loop:
        for i,v in strseq:
            if v!=" ":
                for j in countdown(strseq.high,i):
                    if strseq[j]!=" ":
                        result = strseq[i..j].join()
                        break loop
