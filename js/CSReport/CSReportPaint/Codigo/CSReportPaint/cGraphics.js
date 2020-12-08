(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
UNKNOWN >>     class cGraphics //@@@: class cGraphics
    { //@@@: {
        let mGraphics = null; //@@@: private Graphics mGraphics;
UNKNOWN >>         public Graphics Graphics  //@@@: public Graphics Graphics
        {  //@@@: {
UNKNOWN >>             get{ return this.mGraphics; }  //@@@: get{ return this.mGraphics; }
            let this.mGraphics = value; }; //@@@: set{ this.mGraphics = value; }
        } //@@@: }


        self. = function(graphics) { //@@@: public cGraphics(Graphics graphics)
            this.Graphics = graphics; //@@@: this.Graphics = graphics;
        };  //@@@: }


UNKNOWN >>         #region Fills a Rounded Rectangle with integers.  //@@@: #region Fills a Rounded Rectangle with integers.
        self.FillRoundRectangle = function(brush, ) { //@@@: public void FillRoundRectangle(System.Drawing.Brush brush,
          int x, int y, //@@@: int x, int y,
          int width, int height, int radius)  //@@@: int width, int height, int radius)
        {  //@@@: {

            let fx = Convert.ToSingle(x); //@@@: float fx = Convert.ToSingle(x);
            let fy = Convert.ToSingle(y); //@@@: float fy = Convert.ToSingle(y);
            let fwidth = Convert.ToSingle(width); //@@@: float fwidth = Convert.ToSingle(width);
            let fheight = Convert.ToSingle(height); //@@@: float fheight = Convert.ToSingle(height);
            let fradius = Convert.ToSingle(radius); //@@@: float fradius = Convert.ToSingle(radius);
            this.FillRoundRectangle(brush, fx, fy,  //@@@: this.FillRoundRectangle(brush, fx, fy,
              fwidth, fheight, fradius);  //@@@: fwidth, fheight, fradius);

        };  //@@@: }
UNKNOWN >>         #endregion  //@@@: #endregion


UNKNOWN >>         #region Fills a Rounded Rectangle with continuous numbers. //@@@: #region Fills a Rounded Rectangle with continuous numbers.
        self.FillRoundRectangle = function(brush, ) { //@@@: public void FillRoundRectangle(System.Drawing.Brush brush,
          float x, float y, //@@@: float x, float y,
          float width, float height, float radius) //@@@: float width, float height, float radius)
        { //@@@: {
            let rectangle = new RectangleF(x, y, width, height); //@@@: RectangleF rectangle = new RectangleF(x, y, width, height);
            let path = this.GetRoundedRect(rectangle, radius); //@@@: GraphicsPath path = this.GetRoundedRect(rectangle, radius);
            this.Graphics.FillPath(brush, path); //@@@: this.Graphics.FillPath(brush, path);
        };  //@@@: }
UNKNOWN >>         #endregion //@@@: #endregion


UNKNOWN >>         #region Draws a Rounded Rectangle border with integers.  //@@@: #region Draws a Rounded Rectangle border with integers.
        self.DrawRoundRectangle = function(pen, x, y, ) { //@@@: public void DrawRoundRectangle(System.Drawing.Pen pen, int x, int y,
          int width, int height, int radius)  //@@@: int width, int height, int radius)
        {  //@@@: {
            let fx = Convert.ToSingle(x); //@@@: float fx = Convert.ToSingle(x);
            let fy = Convert.ToSingle(y); //@@@: float fy = Convert.ToSingle(y);
            let fwidth = Convert.ToSingle(width); //@@@: float fwidth = Convert.ToSingle(width);
            let fheight = Convert.ToSingle(height); //@@@: float fheight = Convert.ToSingle(height);
            let fradius = Convert.ToSingle(radius); //@@@: float fradius = Convert.ToSingle(radius);
            this.DrawRoundRectangle(pen, fx, fy, fwidth, fheight, fradius);  //@@@: this.DrawRoundRectangle(pen, fx, fy, fwidth, fheight, fradius);
        }; //@@@: }
UNKNOWN >>         #endregion  //@@@: #endregion


UNKNOWN >>         #region Draws a Rounded Rectangle border with continuous numbers.  //@@@: #region Draws a Rounded Rectangle border with continuous numbers.
        self.DrawRoundRectangle = function(pen, ) { //@@@: public void DrawRoundRectangle(System.Drawing.Pen pen,
          float x, float y, //@@@: float x, float y,
          float width, float height, float radius)  //@@@: float width, float height, float radius)
        {  //@@@: {
            let rectangle = new RectangleF(x, y, width, height); //@@@: RectangleF rectangle = new RectangleF(x, y, width, height);
            let path = this.GetRoundedRect(rectangle, radius); //@@@: GraphicsPath path = this.GetRoundedRect(rectangle, radius);
            this.Graphics.DrawPath(pen, path);  //@@@: this.Graphics.DrawPath(pen, path);
        };  //@@@: }
UNKNOWN >>         #endregion  //@@@: #endregion


UNKNOWN >>         #region Get the desired Rounded Rectangle path.  //@@@: #region Get the desired Rounded Rectangle path.
        const GetRoundedRect = function(baseRect, ) { //@@@: private GraphicsPath GetRoundedRect(RectangleF baseRect,
           float radius)  //@@@: float radius)
        { //@@@: {
            // if corner radius is less than or equal to zero, 
            // return the original rectangle 
            if( radius<=0.0F )  { //@@@: if( radius<=0.0F )
                let mPath = new GraphicsPath(); //@@@: GraphicsPath mPath = new GraphicsPath();
                mPath.AddRectangle(baseRect);  //@@@: mPath.AddRectangle(baseRect);
                mPath.CloseFigure();  //@@@: mPath.CloseFigure();
                return mPath; //@@@: return mPath;
            } //@@@: }

            // if the corner radius is greater than or equal to 
            // half the width, or height (whichever is shorter) 
            // then return a capsule instead of a lozenge 
            if( radius>=(Math.Min(baseRect.Width, baseRect.Height))/2.0)  { //@@@: if( radius>=(Math.Min(baseRect.Width, baseRect.Height))/2.0)
              return GetCapsule( baseRect );  //@@@: return GetCapsule( baseRect );

            // create the arc for the rectangle sides and declare 
            // a graphics path object for the drawing 
            let diameter = radius * 2.0F; //@@@: float diameter = radius * 2.0F;
            let sizeF = new SizeF( diameter, diameter ); //@@@: SizeF sizeF = new SizeF( diameter, diameter );
            let arc = new RectangleF( baseRect.Location, sizeF ); //@@@: RectangleF arc = new RectangleF( baseRect.Location, sizeF );
            let path = new System.Drawing.Drawing2D.GraphicsPath(); //@@@: GraphicsPath path = new System.Drawing.Drawing2D.GraphicsPath();

            // top left arc 
            path.AddArc( arc, 180, 90 );  //@@@: path.AddArc( arc, 180, 90 );

            // top right arc 
            arc.X = baseRect.Right-diameter; //@@@: arc.X = baseRect.Right-diameter;
            path.AddArc( arc, 270, 90 );  //@@@: path.AddArc( arc, 270, 90 );

            // bottom right arc 
            arc.Y = baseRect.Bottom-diameter; //@@@: arc.Y = baseRect.Bottom-diameter;
            path.AddArc( arc, 0, 90 );  //@@@: path.AddArc( arc, 0, 90 );

            // bottom left arc
            arc.X = baseRect.Left; //@@@: arc.X = baseRect.Left;
            path.AddArc( arc, 90, 90 );      //@@@: path.AddArc( arc, 90, 90 );

            path.CloseFigure();  //@@@: path.CloseFigure();
            return path;  //@@@: return path;
        };  //@@@: }
UNKNOWN >>         #endregion  //@@@: #endregion

UNKNOWN >>         #region Gets the desired Capsular path.  //@@@: #region Gets the desired Capsular path.
        const GetCapsule = function(baseRect) { //@@@: private GraphicsPath GetCapsule( RectangleF baseRect )
UNKNOWN >>             float diameter;  //@@@: float diameter;
UNKNOWN >>             RectangleF arc;  //@@@: RectangleF arc;
            let path = new System.Drawing.Drawing2D.GraphicsPath(); //@@@: GraphicsPath path = new System.Drawing.Drawing2D.GraphicsPath();
            try  { //@@@: try
                if( baseRect.Width>baseRect.Height )  { //@@@: if( baseRect.Width>baseRect.Height )
                    // return horizontal capsule 
                    diameter = baseRect.Height; //@@@: diameter = baseRect.Height;
                    let sizeF = new SizeF(diameter, diameter); //@@@: SizeF sizeF = new SizeF(diameter, diameter);
                    arc = new RectangleF( baseRect.Location, sizeF ); //@@@: arc = new RectangleF( baseRect.Location, sizeF );
                    path.AddArc( arc, 90, 180);  //@@@: path.AddArc( arc, 90, 180);
                    arc.X = baseRect.Right-diameter; //@@@: arc.X = baseRect.Right-diameter;
                    path.AddArc( arc, 270, 180);  //@@@: path.AddArc( arc, 270, 180);
                }  //@@@: }
                else if( baseRect.Width < baseRect.Height )  { //@@@: else if( baseRect.Width < baseRect.Height )
                    // return vertical capsule 
                    diameter = baseRect.Width; //@@@: diameter = baseRect.Width;
                    let sizeF = new SizeF(diameter, diameter); //@@@: SizeF sizeF = new SizeF(diameter, diameter);
                    arc = new RectangleF( baseRect.Location, sizeF ); //@@@: arc = new RectangleF( baseRect.Location, sizeF );
                    path.AddArc( arc, 180, 180 );  //@@@: path.AddArc( arc, 180, 180 );
                    arc.Y = baseRect.Bottom-diameter; //@@@: arc.Y = baseRect.Bottom-diameter;
                    path.AddArc( arc, 0, 180 );  //@@@: path.AddArc( arc, 0, 180 );
                }  //@@@: }
                else { //@@@: else
                    // return circle 
                    path.AddEllipse( baseRect );  //@@@: path.AddEllipse( baseRect );
                } //@@@: }
            }  //@@@: }
            catch(ex) { //@@@: catch(Exception ex)
                path.AddEllipse( baseRect );  //@@@: path.AddEllipse( baseRect );
            }  //@@@: }
UNKNOWN >>             finally  //@@@: finally
            {  //@@@: {
                path.CloseFigure();  //@@@: path.CloseFigure();
            }  //@@@: }
            return path;  //@@@: return path;
        };  //@@@: }
UNKNOWN >>         #endregion //@@@: #endregion
    } //@@@: }
}  //@@@: }
