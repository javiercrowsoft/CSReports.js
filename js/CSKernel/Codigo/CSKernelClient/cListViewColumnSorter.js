(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    /// <summary>
    /// This class is an implementation of the 'IComparer' interface.
    /// </summary>
    globalObject.CSKernelClient.createCListViewColumnSorter = function() {

        const self = {}; //@@@: public class cListViewColumnSorter : IComparer
        /// <summary>
        /// Specifies the column to be sorted
        /// </summary>
        let ColumnToSort = null; //@@@: private int ColumnToSort;
        /// <summary>
        /// Specifies the order in which to sort (i.e. 'Ascending').
        /// </summary>
        let OrderOfSort = null; //@@@: private SortOrder OrderOfSort;
        /// <summary>
        /// Case insensitive comparer object
        /// </summary>
        let ObjectCompare = null; //@@@: private CaseInsensitiveComparer ObjectCompare;

        /// <summary>
        /// Class constructor.  Initializes various elements
        /// </summary>
        const cListViewColumnSorter = function() { //@@@: public cListViewColumnSorter()
            // Initialize the column to '0'
            ColumnToSort = 0; //@@@: ColumnToSort = 0;

            // Initialize the sort order to 'none'
            OrderOfSort = SortOrder.None; //@@@: OrderOfSort = SortOrder.None;

            // Initialize the CaseInsensitiveComparer object
            ObjectCompare = new CaseInsensitiveComparer(); //@@@: ObjectCompare = new CaseInsensitiveComparer();
        }; //@@@: }

        /// <summary>
        /// This method is inherited from the IComparer interface.  It compares the two objects passed using a case insensitive comparison.
        /// </summary>
        /// <param name="x">First object to be compared</param>
        /// <param name="y">Second object to be compared</param>
        /// <returns>The result of the comparison. "0" if equal, negative if 'x' is less than 'y' and positive if 'x' is greater than 'y'</returns>
        self.Compare = function(x, y) { //@@@: public int Compare(object x, object y)
UNKNOWN >>             int compareResult; //@@@: int compareResult;
UNKNOWN >>             ListViewItem listviewX, listviewY; //@@@: ListViewItem listviewX, listviewY;

            // Cast the objects to be compared to ListViewItem objects
            listviewX = x; //@@@: listviewX = (ListViewItem)x;
            listviewY = y; //@@@: listviewY = (ListViewItem)y;

            // Compare the two items
            compareResult = ObjectCompare.Compare(listviewX.SubItems[ColumnToSort].Text, listviewY.SubItems[ColumnToSort].Text); //@@@: compareResult = ObjectCompare.Compare(listviewX.SubItems[ColumnToSort].Text, listviewY.SubItems[ColumnToSort].Text);

            // Calculate correct return value based on object comparison
            if (OrderOfSort === SortOrder.Ascending) { //@@@: if (OrderOfSort == SortOrder.Ascending)
                // Ascending sort is selected, return normal result of compare operation
                return compareResult; //@@@: return compareResult;
            } //@@@: }
            else if (OrderOfSort === SortOrder.Descending) { //@@@: else if (OrderOfSort == SortOrder.Descending)
                // Descending sort is selected, return negative result of compare operation
                return (-compareResult); //@@@: return (-compareResult);
            } //@@@: }
            else { //@@@: else
                // Return '0' to indicate they are equal
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        /// <summary>
        /// Gets or sets the number of the column to which to apply the sorting operation (Defaults to '0').
        /// </summary>
UNKNOWN >>         public int SortColumn //@@@: public int SortColumn
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                ColumnToSort = value; //@@@: ColumnToSort = value;
            } //@@@: }
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return ColumnToSort; //@@@: return ColumnToSort;
            } //@@@: }
        } //@@@: }

        /// <summary>
        /// Gets or sets the order of sorting to apply (for example, 'Ascending' or 'Descending').
        /// </summary>
UNKNOWN >>         public SortOrder Order //@@@: public SortOrder Order
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                OrderOfSort = value; //@@@: OrderOfSort = value;
            } //@@@: }
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return OrderOfSort; //@@@: return OrderOfSort;
            } //@@@: }
        } //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
