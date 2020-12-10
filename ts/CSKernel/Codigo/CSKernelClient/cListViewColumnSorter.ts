(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    /// <summary>
    /// This class is an implementation of the 'IComparer' interface.
    /// </summary>
    globalObject.CSKernelClient.createCListViewColumnSorter = function() {

        // @ts-ignore
        let self: CSKernelClient.IcListViewColumnSorter = {};
        /// <summary>
        /// Specifies the column to be sorted
        /// </summary>
        let ColumnToSort: number = null;
        /// <summary>
        /// Specifies the order in which to sort (i.e. 'Ascending').
        /// </summary>
        let OrderOfSort: SortOrder = null;
        /// <summary>
        /// Case insensitive comparer object
        /// </summary>
        let ObjectCompare: CaseInsensitiveComparer = null;

        /// <summary>
        /// Class constructor.  Initializes various elements
        /// </summary>
        const cListViewColumnSorter = function() {
            // Initialize the column to '0'
            ColumnToSort = 0;

            // Initialize the sort order to 'none'
            OrderOfSort = SortOrder.None;

            // Initialize the CaseInsensitiveComparer object
            ObjectCompare = UNKNOWN >>  can't find constructor for class CaseInsensitiveComparer();
        };

        /// <summary>
        /// This method is inherited from the IComparer interface.  It compares the two objects passed using a case insensitive comparison.
        /// </summary>
        /// <param name="x">First object to be compared</param>
        /// <param name="y">Second object to be compared</param>
        /// <returns>The result of the comparison. "0" if equal, negative if 'x' is less than 'y' and positive if 'x' is greater than 'y'</returns>
        self.Compare = function(x, y) {
UNKNOWN >>             int compareResult;
UNKNOWN >>             ListViewItem listviewX, listviewY;

            // Cast the objects to be compared to ListViewItem objects
            listviewX = x;
            listviewY = y;

            // Compare the two items
            compareResult = ObjectCompare.Compare(listviewX.SubItems[ColumnToSort].Text, listviewY.SubItems[ColumnToSort].Text);

            // Calculate correct return value based on object comparison
            if (OrderOfSort === SortOrder.Ascending) {
                // Ascending sort is selected, return normal result of compare operation
                return compareResult;
            }
            else if (OrderOfSort === SortOrder.Descending) {
                // Descending sort is selected, return negative result of compare operation
                return (-compareResult);
            }
            else {
                // Return '0' to indicate they are equal
                return 0;
            }
        };

        /// <summary>
        /// Gets or sets the number of the column to which to apply the sorting operation (Defaults to '0').
        /// </summary>
UNKNOWN >>         public int SortColumn
        {
UNKNOWN >>             set
            {
                ColumnToSort = value;
            }
UNKNOWN >>             get
            {
                return ColumnToSort;
            }
        }

        /// <summary>
        /// Gets or sets the order of sorting to apply (for example, 'Ascending' or 'Descending').
        /// </summary>
UNKNOWN >>         public SortOrder Order
        {
UNKNOWN >>             set
            {
                OrderOfSort = value;
            }
UNKNOWN >>             get
            {
                return OrderOfSort;
            }
        }

        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IcListViewColumnSorter {

    Compare: (object, object) => int;
  }
}
