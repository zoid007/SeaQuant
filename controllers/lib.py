from collections import OrderedDict
from inspect import currentframe
from itertools import compress
from numbers import Number
from typing import Callable, Optional, Sequence, Union

import numpy as np
import pandas as pd


def barssince(condition: Sequence[bool], default=np.inf) -> int:
    """
    Return the number of bars since `condition` sequence was last `True`,
    or if never, return `default`.
        >>> barssince(self.data.Close > self.data.Open)
        3
    """
    return next(compress(range(len(condition)), reversed(condition)), default)


def cross(series1: Sequence, series2: Sequence) -> bool:
    """
    Return `True` if `series1` and `series2` just crossed
    (above or below) each other.
        >>> cross(self.data.Close, self.sma)
        True
    """
    return crossover(series1, series2) or crossover(series2, series1)


def crossover(series: pd.DataFrame, firstIndicator, secondIndicator, currentIndex: int) -> bool:
    # # Ensure that the series are the same length
    # if len(series1) != len(series2):
    #     raise ValueError("Both series must have the same length")
    
    # # Find the index of the first non-NaN value in the series
    # idx = series1.first_valid_index()
    
    # # Initialize variables to keep track of the previous values

        
        print(firstIndicator)

        prev1 = series.loc[currentIndex - 1][firstIndicator]
        prev2 = series.loc[currentIndex - 1][secondIndicator]

        
        # # Iterate through the series starting from the second index
        # for i in range(idx+1, len(series1)):
        curr1 = series.loc[currentIndex][firstIndicator]
        curr2 = series.loc[currentIndex][secondIndicator]
            
        #     # Check for a crossover
        if prev1 < prev2 and curr1 >= curr2:
            return True
        else:
            return False
        #     # Update the previous values
        #     prev1 = curr1
        #     prev2 = curr2
        
        # # If no crossover was found, return False
        # return False

    # else:
    #     if isinstance(firstIndicator, int) != False:
    #         pass
    #     if isinstance(secondIndicator, int) != False:
    #         curr1 = series.loc[currentIndex][firstIndicator]
    #         prev1 = series.loc[currentIndex - 1][firstIndicator]

    #         # curr2 = series.loc[currentIndex][secondIndicator]
    #         # if prev1 < prev2 and curr1 >= curr2:
    #         #     return True
    #         # else:
    #         #     return False
    #         print(curr1, prev1)
    #         if curr1 > secondIndicator and prev1 <= secondIndicator:
    #             return True
    #         else:
    #             False



def crossbelow(series: pd.DataFrame, firstIndicator, secondIndicator, currentIndex: int) -> bool:
    # # Ensure that the series are the same length
    # if len(series1) != len(series2):
    #     raise ValueError("Both series must have the same length")
    
    # # Find the index of the first non-NaN value in the series
    # idx = series1.first_valid_index()
    
    # # Initialize variables to keep track of the previous values


        
        prev1 = series.loc[currentIndex - 1][firstIndicator]
        prev2 = series.loc[currentIndex - 1][secondIndicator]

        
        # # Iterate through the series starting from the second index
        # for i in range(idx+1, len(series1)):
        curr1 = series.loc[currentIndex][firstIndicator]
        curr2 = series.loc[currentIndex][secondIndicator]
            
        #     # Check for a crossover
        if prev1 > prev2 and curr1 <= curr2:
            return True
        else:
            return False
        #     # Update the previous values
        #     prev1 = curr1
        #     prev2 = curr2
        
        # # If no crossover was found, return False
        # return False

    # else:
    #     if isinstance(firstIndicator, int) != False:
    #         pass
    #     if isinstance(secondIndicator, int) != False:
    #         curr1 = series.loc[currentIndex][firstIndicator]
    #         prev1 = series.loc[currentIndex - 1][firstIndicator]

    #         # curr2 = series.loc[currentIndex][secondIndicator]
    #         # if prev1 < prev2 and curr1 >= curr2:
    #         #     return True
    #         # else:
    #         #     return False
    #         print(curr1, prev1)
    #         if curr1 < secondIndicator and prev1 >= secondIndicator:
    #             return True
    #         else:
    #             False
