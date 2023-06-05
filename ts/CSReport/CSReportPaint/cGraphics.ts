namespace CSReportPaint {

    export class cGraphics {

        private graphics: Graphics = null;

        public getGraphics(): Graphics {
            return this.graphics;
        }

        public setGraphics(value: Graphics) {
            this.graphics = value;
        }

        public constructor(graphics: Graphics) {
            this.graphics = graphics;
        } 

        public fillRoundRectangle(brush: Brush,
                                  x: number, y: number,
                                  width: number, height: number,
                                  radius: number) {
            this.fillRoundRectangleWithBrush(brush, x, y, width, height, radius);
        } 

        public fillRoundRectangleWithBrush(brush: Brush, x: number, y: number, width: number, height: number, radius: number) {
            let rectangle: RectangleF = RectangleF.new4(x, y, width, height);
            let path = this.getRoundedRect(rectangle, radius);
            this.graphics.FillPath(brush, path);
        } 

        public drawRoundRectangle(pen: Pen, x: number, y: number, width: number, height: number, radius: number) {
            let rectangle: RectangleF = RectangleF.new4(x, y, width, height);
            let path = this.getRoundedRect(rectangle, radius);
            this.graphics.DrawPath(pen, path);
        } 

        private getRoundedRect(baseRect: RectangleF, radius: number) {

            // if corner radius is less than or equal to zero,
            // return the original rectangle 
            if( radius <= 0 )  {
                let mPath = new GraphicsPath();
                mPath.AddRectangle(baseRect); 
                mPath.CloseFigure(); 
                return mPath;
            }

            // if the corner radius is greater than or equal to 
            // half the width, or height (whichever is shorter) 
            // then return a capsule instead of a lozenge 
            if(radius>=(Math.min(baseRect.getWidth(), baseRect.getHeight()))/2.0)
              return GetCapsule( baseRect ); 

            // create the arc for the rectangle sides and declare 
            // a graphics path object for the drawing 
            let diameter: number = radius * 2.0;
            let sizeF = new SizeF( diameter, diameter );
            let arc: RectangleF = new RectangleF( baseRect.Location, sizeF );
            let path: GraphicsPath = new GraphicsPath();

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
        }

        private GetCapsule(baseRect: RectangleF, diameter: number, arc: RectangleF) {
            let path: GraphicsPath = new GraphicsPath();
            try  {
                if( baseRect.getWidth() > baseRect.getHeight() )  {
                    // return horizontal capsule 
                    diameter = baseRect.getHeight();
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = new RectangleF( baseRect.Location, sizeF );
                    path.AddArc( arc, 90, 180); 
                    arc.X = baseRect.Right-diameter;
                    path.AddArc( arc, 270, 180); 
                } 
                else if( baseRect.Width < baseRect.Height )  {
                    // return vertical capsule 
                    diameter = baseRect.Width;
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = new RectangleF( baseRect.Location, sizeF );
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
            finally
            { 
                path.CloseFigure(); 
            } 
            return path; 
        } 
    }
} 
