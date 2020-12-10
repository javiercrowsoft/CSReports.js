(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createCGraphics = function() {

        // @ts-ignore
        let self: CSReportPaint.IcGraphics = {};
        let mGraphics: Graphics = null;
UNKNOWN >>         public Graphics Graphics 
        { 
UNKNOWN >>             get{ return this.mGraphics; } 
            let this.mGraphics: set{ = value; };
        };


        const cGraphics = function(graphics) {
            this.Graphics = graphics;
        }; 


UNKNOWN >>         #region Fills a Rounded Rectangle with integers. 
        self.FillRoundRectangle = function(brush, ) {
          int x, int y,
          int width, int height, int radius) 
        { 

            let fx: number = Convert.ToSingle(x);
            let fy: number = Convert.ToSingle(y);
            let fwidth: number = Convert.ToSingle(width);
            let fheight: number = Convert.ToSingle(height);
            let fradius: number = Convert.ToSingle(radius);
            this.FillRoundRectangle(brush, fx, fy, 
              fwidth, fheight, fradius); 

        }; 
UNKNOWN >>         #endregion 


UNKNOWN >>         #region Fills a Rounded Rectangle with continuous numbers.
        self.FillRoundRectangle = function(brush, ) {
          float x, float y,
          float width, float height, float radius)
        {
            let rectangle: RectangleF = new RectangleF(x, y, width, height);
            let path: GraphicsPath = this.GetRoundedRect(rectangle, radius);
            this.Graphics.FillPath(brush, path);
        }; 
UNKNOWN >>         #endregion


UNKNOWN >>         #region Draws a Rounded Rectangle border with integers. 
        self.DrawRoundRectangle = function(pen, x, y, ) {
          int width, int height, int radius) 
        { 
            let fx: number = Convert.ToSingle(x);
            let fy: number = Convert.ToSingle(y);
            let fwidth: number = Convert.ToSingle(width);
            let fheight: number = Convert.ToSingle(height);
            let fradius: number = Convert.ToSingle(radius);
            this.DrawRoundRectangle(pen, fx, fy, fwidth, fheight, fradius); 
        };
UNKNOWN >>         #endregion 


UNKNOWN >>         #region Draws a Rounded Rectangle border with continuous numbers. 
        self.DrawRoundRectangle = function(pen, ) {
          float x, float y,
          float width, float height, float radius) 
        { 
            let rectangle: RectangleF = new RectangleF(x, y, width, height);
            let path: GraphicsPath = this.GetRoundedRect(rectangle, radius);
            this.Graphics.DrawPath(pen, path); 
        }; 
UNKNOWN >>         #endregion 


UNKNOWN >>         #region Get the desired Rounded Rectangle path. 
        const GetRoundedRect = function(baseRect, ) {
           float radius) 
        {
            // if corner radius is less than or equal to zero, 
            // return the original rectangle 
            if( radius<=0.0F )  {
                let mPath: GraphicsPath = new GraphicsPath();
                mPath.AddRectangle(baseRect); 
                mPath.CloseFigure(); 
                return mPath;
            }

            // if the corner radius is greater than or equal to 
            // half the width, or height (whichever is shorter) 
            // then return a capsule instead of a lozenge 
            if( radius>=(Math.Min(baseRect.Width, baseRect.Height))/2.0)  {
              return GetCapsule( baseRect ); 

            // create the arc for the rectangle sides and declare 
            // a graphics path object for the drawing 
            let diameter: number = radius * 2.0F;
            let sizeF: SizeF = new SizeF( diameter, diameter );
            let arc: RectangleF = new RectangleF( baseRect.Location, sizeF );
            let path: GraphicsPath = new System.Drawing.Drawing2D.GraphicsPath();

            // top left arc 
            path.AddArc( arc, 180, 90 ); 

            // top right arc 
            arc.X = baseRect.Right-diameter;
            path.AddArc( arc, 270, 90 ); 

            // bottom right arc 
            arc.Y = baseRect.Bottom-diameter;
            path.AddArc( arc, 0, 90 ); 

            // bottom left arc
            arc.X = baseRect.Left;
            path.AddArc( arc, 90, 90 );     

            path.CloseFigure(); 
            return path; 
        }; 
UNKNOWN >>         #endregion 

UNKNOWN >>         #region Gets the desired Capsular path. 
        const GetCapsule = function(baseRect) {
UNKNOWN >>             float diameter; 
UNKNOWN >>             RectangleF arc; 
            let path: GraphicsPath = new System.Drawing.Drawing2D.GraphicsPath();
            try  {
                if( baseRect.Width>baseRect.Height )  {
                    // return horizontal capsule 
                    diameter = baseRect.Height;
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = UNKNOWN >>  can't find constructor for class RectangleF( baseRect.Location, sizeF );
                    path.AddArc( arc, 90, 180); 
                    arc.X = baseRect.Right-diameter;
                    path.AddArc( arc, 270, 180); 
                } 
                else if( baseRect.Width < baseRect.Height )  {
                    // return vertical capsule 
                    diameter = baseRect.Width;
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = UNKNOWN >>  can't find constructor for class RectangleF( baseRect.Location, sizeF );
                    path.AddArc( arc, 180, 180 ); 
                    arc.Y = baseRect.Bottom-diameter;
                    path.AddArc( arc, 0, 180 ); 
                } 
                else {
                    // return circle 
                    path.AddEllipse( baseRect ); 
                }
            } 
            catch(ex) {
                path.AddEllipse( baseRect ); 
            } 
UNKNOWN >>             finally 
            { 
                path.CloseFigure(); 
            } 
            return path; 
        }; 
UNKNOWN >>         #endregion
        return self;

    }    }
} (globalObject));


namespace CSReportPaint {

  export interface IcGraphics {

    FillRoundRectangle: (System.Drawing.Brush, ) => void;
    FillRoundRectangle: (System.Drawing.Brush, ) => void;
    DrawRoundRectangle: (System.Drawing.Pen, int, int, ) => void;
    DrawRoundRectangle: (System.Drawing.Pen, ) => void;
  }
}
